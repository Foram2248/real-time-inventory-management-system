from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
import duckdb
import logging
import os
# Setup Flask here
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Setup database connection where DB_PATH = "db/product.db"
DB_PATH = "db/product.db"
connection = duckdb.connect(DB_PATH)

# Setup logging to get all logs while app is running
logging.basicConfig(filename="logs/app.log", level=logging.INFO)

# create root route
@app.route("/")
def index():
    return "<h1>Welcome to the Real-Time Inventory Management System Backend</h1>"

# Fetch all categories
@app.route("/categories", methods=["GET"])
def get_categories():
    try:
        logging.info("Fetching all categories")
        result = connection.execute("SELECT id, category_name FROM categories").fetchall()
        categories = [{"id": r[0], "category_name": r[1]} for r in result]
        return jsonify({"success": True, "data": categories}), 200
    except Exception as e:
        logging.error(f"Error fetching categories: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

# All WebSocket events 
@socketio.on("get_products")
def get_products():
    try:
        logging.info("Fetching all products")
        query = """
        SELECT 
            p.id, 
            p.name, 
            c.category_name, 
            p.price, 
            p.stock, 
            p.status 
        FROM products p 
        JOIN categories c ON p.category_id = c.id;
        """
        result = connection.execute(query).fetchall()
        products = [
            {"id": r[0], "name": r[1], "category": r[2], "price": r[3], "stock": r[4], "status": r[5]}
            for r in result
        ]
        socketio.emit("products_data", products)
    except Exception as e:
        logging.error(f"Error fetching products: {str(e)}")
        socketio.emit("error", {"message": "Error fetching products"})

# Add product
@socketio.on("add_product")
def add_product(data, ack=None):
    try:
        max_id_query = connection.execute("SELECT MAX(id) FROM products").fetchone()
        max_id = max_id_query[0] if max_id_query[0] is not None else 0

        # Assign the next ID
        data["id"] = max_id + 1

        connection.execute(
            "INSERT INTO products (id, name, category_id, price, stock, status) VALUES (?, ?, ?, ?, ?, ?)",
            (data["id"], data["name"], data["category_id"], data["price"], data["stock"], data["status"]),
        )

        socketio.emit("product_update", {"action": "add", "item": data})

        if ack:
            ack({"success": True, "data": data})
    except Exception as e:
        logging.error(f"Error adding product: {str(e)}")
        
        if ack:
            ack({"success": False, "error": str(e)})

# update_product WebSocket events 
@socketio.on("update_product")
def update_product(data):
    try:
        # Log the update action
        logging.info(f"Updating product with ID {data['id']} on field {data['field']} with value {data['value']}")

        # Ensure the provided field is valid to prevent SQL injection
        allowed_fields = ["name", "category_id", "price", "stock", "status"]
        if data["field"] not in allowed_fields:
            raise ValueError(f"Invalid field: {data['field']}")

        # Execute the update query
        connection.execute(
            f"UPDATE products SET {data['field']} = ? WHERE id = ?", (data["value"], data["id"])
        )

        # Emit the update action to the frontend
        socketio.emit("product_update", {
            "action": "update",
            "id": data["id"],
            "field": data["field"],
            "value": data["value"]
        })
    except Exception as e:
        # Log the error and emit it to the frontend
        logging.error(f"Error updating product: {str(e)}")
        socketio.emit("error", {"message": f"Error updating product: {str(e)}"})


# Show low-stock WebSocket events 
@app.route("/low-stock", methods=["GET"])
def low_stock_products():
    try:
        query = """
        SELECT 
            p.id, 
            p.name, 
            c.category_name, 
            p.stock
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.stock < 10;
        """
        result = connection.execute(query).fetchall()
        products = [{"id": r[0], "name": r[1], "category": r[2], "stock": r[3]} for r in result]
        return jsonify({"success": True, "data": products}), 200
    except Exception as e:
        logging.error(f"Error fetching low stock products: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

# category-stock-insights WebSocket events 
@app.route("/category-stock-insights", methods=["GET"])
def get_category_stock_insights():
    try:
        query = """
        SELECT 
            c.category_name,
            p.name AS product_name,
            SUM(p.stock) AS total_stock,
            GROUPING(c.category_name, p.name) AS grouping_level
        FROM products p
        JOIN categories c ON p.category_id = c.id
        GROUP BY GROUPING SETS (
            (c.category_name, p.name),
            (c.category_name)
        )
        ORDER BY grouping_level, c.category_name, product_name;
        """
        result = connection.execute(query).fetchall()
        insights = [
            {
                "category_name": row[0],
                "product_name": row[1],
                "total_stock": row[2],
                "grouping_level": "Category Only" if row[3] == 1 else "Category + Product Level"
            }
            for row in result
        ]
        return jsonify({"success": True, "data": insights}), 200
    except Exception as e:
        logging.error(f"Error fetching category stock insights: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/sales", methods=["GET"])
def get_sales():
    try:
        query = """
        SELECT 
            sale_id,
            product_id,
            product_name,
            quantity,
            sale_date,
            sale_duration_days,
            total_sales_value
        FROM sales_with_calculations;  -- Corrected view name
        """
        result = connection.execute(query).fetchall()
        sales = [
            {
                "sale_id": r[0],
                "product_id": r[1],
                "product_name": r[2],
                "quantity": r[3],
                "sale_date": r[4],
                "sale_duration_days": r[5],
                "total_sales_value": r[6],
            }
            for r in result
        ]
        return jsonify({"success": True, "data": sales}), 200
    except Exception as e:
        logging.error(f"Error fetching sales data: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500
    
# delete_product WebSocket events 
@socketio.on("delete_product")
def delete_product(data):
    try:
        logging.info(f"Deleting product with ID {data['id']}")
        connection.execute("DELETE FROM products WHERE id = ?", (data["id"],))
        # Emit updated product list to frontend
        get_products()
    except Exception as e:
        logging.error(f"Error deleting product: {str(e)}")
        socketio.emit("error", {"message": "Error deleting product"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    socketio.run(app, host="0.0.0.0", port=port, allow_unsafe_werkzeug=True)

