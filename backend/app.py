from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
import duckdb
import logging

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

# All WebSocket events 
@socketio.on("get_products")
# get_products WebSocket events 
def get_products():
    try:
        logging.info("Fetching all products")
        result = connection.execute("SELECT * FROM products").fetchall()
        products = [
            {"id": r[0], "name": r[1], "category": r[2], "price": r[3], "stock": r[4], "status": r[5]}
            for r in result
        ]
        socketio.emit("products_data", products)
    except Exception as e:
        logging.error(f"Error fetching products: {str(e)}")
        socketio.emit("error", {"message": "Error fetching products"})

# add_product WebSocket events 
@socketio.on("add_product")
def add_product(data, ack=None):
    try:
        # Fetch the current maximum id from the database
        max_id_query = connection.execute("SELECT MAX(id) FROM products").fetchone()
        max_id = max_id_query[0] if max_id_query[0] is not None else 0

        # Assign the next ID
        data["id"] = max_id + 1

        # Insert the new product into the database
        connection.execute(
            "INSERT INTO products (id, name, category, price, stock, status) VALUES (?, ?, ?, ?, ?, ?)",
            (data["id"], data["name"], data["category"], data["price"], data["stock"], data["status"]),
        )

        # Emit product update to all clients
        socketio.emit("product_update", {"action": "add", "item": data})

        # Send acknowledgment to the client
        if ack:
            ack({"success": True, "data": data})
    except Exception as e:
        logging.error(f"Error adding product: {str(e)}")

        # Send error acknowledgment to the client
        if ack:
            ack({"success": False, "error": str(e)})

# update_product WebSocket events 
@socketio.on("update_product")
def update_product(data):
    try:
        logging.info(f"Updating product with ID {data['id']} on field {data['field']} with value {data['value']}")
        connection.execute(
            f"UPDATE products SET {data['field']} = ? WHERE id = ?", (data["value"], data["id"])
        )
        # Emit update action to frontend
        socketio.emit("product_update", {"action": "update", "id": data["id"], "field": data["field"], "value": data["value"]})
    except Exception as e:
        logging.error(f"Error updating product: {str(e)}")
        socketio.emit("error", {"message": "Error updating product"})


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
    logging.info("Starting server on port 5000")
    socketio.run(app, host="0.0.0.0", port=5000)
