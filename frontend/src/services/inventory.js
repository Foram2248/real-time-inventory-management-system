import { getSocket } from "./websocket";
import { products } from "../stores/products"; // Import the products store

// Fetch products and update the store
export const fetchProducts = async () => {
  try {
    const socket = getSocket();
    return new Promise((resolve, reject) => {
      socket.emit("get_products");
      socket.on("products_data", (data) => {
        if (data) {
          products.set(data); // Update the store
          resolve(data);
        } else {
          reject(new Error("Failed to fetch products"));
        }
      });
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Subscribe to real-time product updates
export const subscribeToProductUpdates = async () => {
  try {
    const socket = getSocket();
    socket.on("product_update", (update) => {
      products.update((current) => {
        if (update.action === "add") {
          return [...current, update.item];
        } else if (update.action === "update") {
          return current.map((product) =>
            product.id === update.id
              ? { ...product, [update.field]: update.value }
              : product
          );
        } else if (update.action === "delete") {
          return current.filter((product) => product.id !== update.id);
        }
        return current;
      });
    });
  } catch (error) {
    console.error("Error subscribing to product updates:", error);
    throw error;
  }
};

// Add a product
export const addProduct = async (product) => {
  try {
    const socket = getSocket();
    return new Promise((resolve, reject) => {
      socket.emit("add_product", product, (response) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.error || "Failed to add product"));
        }
      });
    });
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (data) => {
  try {
    const socket = getSocket();
    return new Promise((resolve, reject) => {
      socket.emit("update_product", data, (response) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.error || "Failed to update product"));
        }
      });
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const socket = getSocket();
    return new Promise((resolve, reject) => {
      socket.emit("delete_product", { id: productId }, (response) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.error || "Failed to delete product"));
        }
      });
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
