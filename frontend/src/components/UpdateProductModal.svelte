<script>
  import { onMount } from "svelte";

  // Import methods from services
  import { updateProduct } from "../services/inventory";
  import { fetchCategories } from "../services/categories";

  export let showUpdateModal; // Modal visibility state
  export let product; // Product data passed as a prop

  let updatedProduct = { ...product }; // A local copy to modify
  let categories = [];
  let isLoadingCategories = true;
  let fetchError = "";

  // Fetch categories via the service
  const loadCategories = async () => {
    try {
      const data = await fetchCategories(); // Fetch categories from the service
      if (data.success) {
        categories = data.data;

        // Convert category name to category_id if needed
        if (updatedProduct.category && !updatedProduct.category_id) {
          const matchedCategory = categories.find(
            (cat) => cat.category_name === updatedProduct.category
          );
          if (matchedCategory) {
            updatedProduct.category_id = matchedCategory.id;
          }
        }
      } else {
        fetchError = "Failed to fetch categories.";
        console.error("Error fetching categories:", data.error);
      }
    } catch (error) {
      fetchError = "Failed to fetch categories. Please try again.";
      console.error("Error fetching categories:", error);
    } finally {
      isLoadingCategories = false;
    }
  };

  // Update product fields via the service
  const saveChanges = async () => {
    try {
      // Emit updates only for changed fields
      const updateFields = [
        { field: "name", value: updatedProduct.name },
        { field: "category_id", value: updatedProduct.category_id },
        { field: "price", value: updatedProduct.price },
        { field: "stock", value: updatedProduct.stock },
        { field: "status", value: updatedProduct.status },
      ];

      for (const { field, value } of updateFields) {
        if (value !== product[field]) {
          await updateProduct({ id: product.id, field, value });
        }
      }

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product. Please try again.");
    } finally {
      showUpdateModal = false;
    }
  };

  // Fetch categories on mount
  onMount(() => {
    loadCategories();
  });
</script>

{#if showUpdateModal}
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg p-6 shadow-lg w-1/3">
      <h2 class="text-xl font-bold mb-4">Update Product</h2>
      {#if isLoadingCategories}
        <p>Loading categories...</p>
      {:else if fetchError}
        <p class="text-red-500">{fetchError}</p>
      {:else}
        <div class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium">Name</label>
            <input
              id="name"
              class="border rounded w-full p-2"
              bind:value={updatedProduct.name}
            />
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-medium"
              >Category</label
            >
            <select
              id="category"
              class="border rounded w-full p-2"
              bind:value={updatedProduct.category_id}
            >
              <option value="" disabled>Select a category</option>
              {#each categories as category}
                <option value={category.id}>{category.category_name}</option>
              {/each}
            </select>
          </div>

          <!-- Price -->
          <div>
            <label for="price" class="block text-sm font-medium">Price</label>
            <input
              id="price"
              type="number"
              class="border rounded w-full p-2"
              bind:value={updatedProduct.price}
            />
          </div>

          <!-- Stock -->
          <div>
            <label for="stock" class="block text-sm font-medium">Stock</label>
            <input
              id="stock"
              type="number"
              class="border rounded w-full p-2"
              bind:value={updatedProduct.stock}
            />
          </div>

          <!-- Status -->
          <div>
            <label for="status" class="block text-sm font-medium">Status</label>
            <select
              id="status"
              class="border rounded w-full p-2"
              bind:value={updatedProduct.status}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      {/if}

      <!-- Buttons -->
      <div class="flex justify-end mt-4">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          on:click={saveChanges}
        >
          Save
        </button>
        <button
          class="bg-gray-400 text-white px-4 py-2 rounded"
          on:click={() => (showUpdateModal = false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}
