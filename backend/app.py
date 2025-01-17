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

DB_PATH = "db/product.db"
connection = duckdb.connect(DB_PATH)

logging.basicConfig(filename="logs/app.log", level=logging.INFO)

@app.route("/")
def index():
    return "<h1>Welcome to the Real-Time Inventory Management System Backend</h1>"

# Method to fetch all categories
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

# Method to get all products 
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

# Method to add product
@socketio.on("add_product")
def add_product(data, ack=None):
    try:
        max_id_query = connection.execute("SELECT MAX(id) FROM products").fetchone()
        max_id = max_id_query[0] if max_id_query[0] is not None else 0
        data["id"] = max_id + 1
        connection.execute(
            "INSERT INTO products (id, name, category_id, price, stock, status) VALUES (?, ?, ?, ?, ?, ?)",
            (data["id"], data["name"], data["category_id"], data["price"], data["stock"], data["status"]),
        )
        connection.commit()
        
        query = """
        SELECT 
            p.id, 
            p.name, 
            c.category_name, 
            p.price, 
            p.stock, 
            p.status 
        FROM products p 
        JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?;
        """
        result = connection.execute(query, (data["id"],)).fetchone()
        item = {
            "id": result[0],
            "name": result[1],
            "category": result[2],
            "price": result[3],
            "stock": result[4],
            "status": result[5],
        }
        socketio.emit("product_update", {"action": "add", "item": item})
        if ack:
            ack({"success": True, "data": item})
    except Exception as e:
        logging.error(f"Error adding product: {str(e)}")
        if ack:
            ack({"success": False, "error": str(e)})

# Method to update product
@socketio.on("update_product")
def update_product(data):
    try:
        logging.info(f"Updating product with ID {data['id']} on field {data['field']} with value {data['value']}")
        allowed_fields = ["name", "category_id", "price", "stock", "status"]
        if data["field"] not in allowed_fields:
            raise ValueError(f"Invalid field: {data['field']}")

        connection.execute(
            f"UPDATE products SET {data['field']} = ? WHERE id = ?", (data["value"], data["id"])
        )

        socketio.emit("product_update", {
            "action": "update",
            "id": data["id"],
            "field": data["field"],
            "value": data["value"]
        })
    except Exception as e:
        logging.error(f"Error updating product: {str(e)}")
        socketio.emit("error", {"message": f"Error updating product: {str(e)}"})

# Method to delete product
@socketio.on("delete_product")
def delete_product(data, ack=None):
    try:
        logging.info(f"Deleting product with ID {data['id']}")
        connection.execute("DELETE FROM products WHERE id = ?", (data["id"],))
        socketio.emit("product_update", {"action": "delete", "id": data["id"]})
        if ack:
            ack({"success": True})
    except Exception as e:
        logging.error(f"Error deleting product: {str(e)}")
        socketio.emit("product_update", {"action": "error", "error": str(e)})
        if ack:
            ack({"success": False, "error": str(e)})

# Method to show low-stock
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

# Method to show category-stock-inshights
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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host="0.0.0.0", port=port, allow_unsafe_werkzeug=True)

