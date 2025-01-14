import api from "../apis/api";

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    console.log("response categories................", response);
    return response.data; // Return parsed JSON data
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
