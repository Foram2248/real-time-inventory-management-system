import api from "../apis/api";
import { categories } from "../stores/categories";

// Service to fetch categories and update the store
export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    console.log("API response for categories:", response);

    if (response.data && response.data.success) {
      const categoryData = response.data.data;

      categories.set(categoryData);

      return categoryData;
    } else {
      throw new Error("Unexpected response format or failed request");
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
