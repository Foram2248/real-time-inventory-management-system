import api from "../apis/api";

// Fetch category stock insights
export const fetchCategoryStockInsights = async () => {
  try {
    const response = await api.get("/category-stock-insights");
    return response.data;
  } catch (error) {
    console.error("Error fetching category stock insights:", error);
    throw error;
  }
};
