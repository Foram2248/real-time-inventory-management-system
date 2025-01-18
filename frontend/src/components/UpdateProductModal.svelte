<script>
  import { updateProduct } from "../services/inventory";
  import { categories } from "../stores/categories";

  export let showUpdateModal;
  export let product;

  let updatedProduct = { ...product };
  let isLoadingCategories = false;
  let fetchError = "";

  $: availableCategories = $categories;

  const saveChanges = async () => {
    try {
      const fieldsToUpdate = [
        { field: "name", value: updatedProduct.name },
        { field: "category_id", value: updatedProduct.category_id },
        { field: "price", value: updatedProduct.price },
        { field: "stock", value: updatedProduct.stock },
        { field: "status", value: updatedProduct.status },
      ];

      for (const { field, value } of fieldsToUpdate) {
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
          <div>
            <label for="name" class="block text-sm font-medium">Name</label>
            <input
              id="name"
              class="border rounded w-full p-2"
              bind:value={updatedProduct.name}
            />
          </div>
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
              {#each availableCategories as category}
                <option value={category.id}>{category.category_name}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="price" class="block text-sm font-medium">Price</label>
            <input
              id="price"
              type="number"
              class="border rounded w-full p-2"
              bind:value={updatedProduct.price}
            />
          </div>
          <div>
            <label for="stock" class="block text-sm font-medium">Stock</label>
            <input
              id="stock"
              type="number"
              class="border rounded w-full p-2"
              bind:value={updatedProduct.stock}
            />
          </div>
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
