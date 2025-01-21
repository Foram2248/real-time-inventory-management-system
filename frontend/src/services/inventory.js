import { getSocket } from "./websocket";
import { products } from "../stores/products";
import { categories } from "../stores/categories";

// Service to fetch products and update the products store
export const fetchProducts = async () => {
  try {
    const socket = getSocket();
    socket.off("products_data");
    socket.on("products_data", (data) => {
      if (data) {
        products.set(data);
      } else {
        console.error("Failed to fetch products: Data is undefined");
      }
    });
    socket.emit("get_products");
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Subscribe to real-time product updates
export const subscribeToProductUpdates = async () => {
  try {
    const socket = getSocket();
    socket.off("product_update");
    socket.on("product_update", (update) => {
      try {
        products.update((current) => {
          if (update.action === "add") {
            return [...current, update.item];
          } else if (update.action === "update") {
            return current.map((product) => {
              if (product.id === update.id) {
                if (update.field === "category_id") {
                  let updatedCategoryName = "Unknown";
                  categories.subscribe((cats) => {
                    const updatedCategory = cats.find(
                      (cat) => cat.id === update.value
                    );
                    updatedCategoryName = updatedCategory
                      ? updatedCategory.category_name
                      : "Unknown";
                  });
                  return {
                    ...product,
                    category_id: update.value,
                    category: updatedCategoryName,
                  };
                }
                return { ...product, [update.field]: update.value };
              }
              return product;
            });
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
      if (!response || !response.success) {
        console.error("Error updating product:", response?.error);
        throw new Error(
          response?.error || "Unknown error while updating product"
        );
      }
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
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
