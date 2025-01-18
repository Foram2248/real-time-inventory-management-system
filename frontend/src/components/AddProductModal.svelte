<script>
  import { addProduct } from "../services/inventory";
  import { categories } from "../stores/categories";

  export let showAddModal;

  let newProduct = {
    id: "",
    name: "",
    category_id: null,
    price: 0,
    stock: 0,
    status: "Active",
  };

  $: availableCategories = $categories;

  // method to add new product
  const saveProduct = async () => {
    if (!newProduct.name || !newProduct.category_id) {
      alert("Name and Category are required!");
      return;
    }

    try {
      const productToAdd = { ...newProduct, id: null };
      await addProduct(productToAdd);
      alert("Product added successfully!");

      newProduct = {
        id: "",
        name: "",
        category_id: null,
        price: 0,
        stock: 0,
        status: "Active",
      };

      showAddModal = false;
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const closeModal = () => {
    showAddModal = false;
  };
</script>

{#if showAddModal}
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg p-6 shadow-lg w-1/3">
      <h2 class="text-xl font-bold mb-4">Add Product</h2>

      {#if !$categories.length}
        <p>Loading categories...</p>
      {:else}
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium">Name</label>
            <input
              id="name"
              class="border rounded w-full p-2"
              bind:value={newProduct.name}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label for="category" class="block text-sm font-medium"
              >Category</label
            >
            <select
              id="category"
              class="border rounded w-full p-2"
              bind:value={newProduct.category_id}
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
              bind:value={newProduct.price}
              placeholder="Enter product price"
            />
          </div>
          <div>
            <label for="stock" class="block text-sm font-medium">Stock</label>
            <input
              id="stock"
              type="number"
              class="border rounded w-full p-2"
              bind:value={newProduct.stock}
              placeholder="Enter stock quantity"
            />
          </div>
          <div>
            <label for="status" class="block text-sm font-medium">Status</label>
            <select
              id="status"
              class="border rounded w-full p-2"
              bind:value={newProduct.status}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      {/if}
      <div class="flex justify-end mt-4">
        <button
          class="bg-green-500 text-white px-4 py-2 rounded mr-2"
          on:click={saveProduct}
          disabled={!$categories.length}
        >
          Add
        </button>
        <button
          class="bg-gray-400 text-white px-4 py-2 rounded"
          on:click={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}
