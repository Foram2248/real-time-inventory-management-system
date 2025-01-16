import { getSocket } from "./websocket";
import { products } from "../stores/products";

// Service to fetch products and update the store
export const fetchProducts = async () => {
  try {
    const socket = getSocket();
    socket.emit("get_products");
    socket.on("products_data", (data) => {
      if (data) {
        products.set(data);
      } else {
        console.error("Failed to fetch products: Data is undefined");
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Subscribe to real-time product updates
export const subscribeToProductUpdates = async () => {
  try {
    const socket = getSocket();
    socket.on("product_update", (update) => {
      try {
        console.log("before update store ...", products);
        products.update((current) => {
          if (update.action === "add") {
            console.log("before update store ...", update);
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
      } catch (innerError) {
        console.error("Error processing product update:", innerError);
      }
    });
  } catch (error) {
    console.error("Error subscribing to product updates:", error);
  }
};

// Service to add a product
export const addProduct = async (product) => {
  console.log("Service..", product);
  try {
    const socket = getSocket();
    socket.emit("add_product", product, (response) => {
      if (!response || !response.success) {
        throw new Error(
          response?.error || "Unknown error while adding product"
        );
      }
    });
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Service to update a product
export const updateProduct = async (data) => {
  try {
    const socket = getSocket();
    socket.emit("update_product", data, (response) => {
      if (!response.success) {
        console.error("Error updating product:", response.error);
      }
    });
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Service to delete a product
export const deleteProduct = async (productId) => {
  try {
    const socket = getSocket();
    socket.emit("delete_product", { id: productId });
    socket.on("delete_product_response", (response) => {
      if (response.success) {
        products.update((current) =>
          current.filter((product) => product.id !== response.id)
        );
      } else {
        console.error("Error deleting product:", response.error);
        throw new Error(response.error || "Unknown error");
      }
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
