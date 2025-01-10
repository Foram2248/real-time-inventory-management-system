<script>
    export let showUpdateModal;
    export let socket;
    export let product;
  
    let updatedProduct = { ...product };
    let categories = []; // To store categories fetched from the backend
  
    // Fetch categories on mount
    const fetchCategories = () => {
      fetch("http://localhost:5000/categories")
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            categories = data.data;
  
            // Set category_id for updatedProduct if only category is provided
            if (updatedProduct.category && !updatedProduct.category_id) {
              const matchedCategory = categories.find(
                (cat) => cat.category_name === updatedProduct.category
              );
              if (matchedCategory) {
                updatedProduct.category_id = matchedCategory.id;
              }
            }
          } else {
            console.error("Error fetching categories:", data.error);
            alert("Failed to fetch categories.");
          }
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          alert("Failed to fetch categories.");
        });
    };
  
    const updateProduct = () => {
      // Emit WebSocket events for each updated field
      if (updatedProduct.name !== product.name) {
        socket.emit("update_product", { id: product.id, field: "name", value: updatedProduct.name });
      }
      if (updatedProduct.category_id !== product.category_id) {
        socket.emit("update_product", { id: product.id, field: "category_id", value: updatedProduct.category_id });
      }
      if (updatedProduct.price !== product.price) {
        socket.emit("update_product", { id: product.id, field: "price", value: updatedProduct.price });
      }
      if (updatedProduct.stock !== product.stock) {
        socket.emit("update_product", { id: product.id, field: "stock", value: updatedProduct.stock });
      }
      if (updatedProduct.status !== product.status) {
        socket.emit("update_product", { id: product.id, field: "status", value: updatedProduct.status });
      }
      showUpdateModal = false;
    };
  
    // Fetch categories on component mount
    fetchCategories();
  </script>
  
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg p-6 shadow-lg w-1/3">
      <h2 class="text-xl font-bold mb-4">Update Product</h2>
      <div class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium">Name</label>
          <input id="name" class="border rounded w-full p-2" bind:value={updatedProduct.name} />
        </div>
        <div>
          <label for="category" class="block text-sm font-medium">Category</label>
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
        <div>
          <label for="price" class="block text-sm font-medium">Price</label>
          <input id="price" type="number" class="border rounded w-full p-2" bind:value={updatedProduct.price} />
        </div>
        <div>
          <label for="stock" class="block text-sm font-medium">Stock</label>
          <input id="stock" type="number" class="border rounded w-full p-2" bind:value={updatedProduct.stock} />
        </div>
        <div>
          <label for="status" class="block text-sm font-medium">Status</label>
          <select id="status" class="border rounded w-full p-2" bind:value={updatedProduct.status}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          on:click={updateProduct}
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
  