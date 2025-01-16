import api from "../apis/api";

// Service to fetch categories
export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    console.log("api response .. ", response);
    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      throw new Error("Unexpected response format or failed request");
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
