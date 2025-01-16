<script>
  import { deleteProduct } from "../services/inventory";

  export let showDeleteModal;
  export let product;

  // Function to handle product deletion
  const doDeleteProduct = async () => {
    try {
      await deleteProduct(product.id);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error.message);
      alert(`Error deleting product: ${error.message}`);
    } finally {
      showDeleteModal = false;
    }
  };
</script>

{#if showDeleteModal}
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg p-6 shadow-lg w-1/3">
      <h2 class="text-xl font-bold mb-4">Delete Product</h2>
      <p class="mb-4">
        Are you sure you want to delete <strong>{product.name}</strong>?
      </p>
      <div class="flex justify-end">
        <button
          class="bg-red-500 text-white px-4 py-2 rounded mr-2"
          on:click={doDeleteProduct}
        >
          Delete
        </button>
        <button
          class="bg-gray-400 text-white px-4 py-2 rounded"
          on:click={() => (showDeleteModal = false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}
