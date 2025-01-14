import api from "../apis/api";

// Fetch low-stock products
export const fetchLowStockProducts = async () => {
  try {
    const response = await api.get("/low-stock");
    return response.data;
  } catch (error) {
    console.error("Error fetching low-stock products:", error);
    throw error;
  }
};
