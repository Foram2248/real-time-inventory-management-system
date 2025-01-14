<script>
  import { onMount } from "svelte";

  // Flowbite-Svelte components
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Button,
  } from "flowbite-svelte";

  // Modals
  import AddProductModal from "../components/AddProductModal.svelte";
  import UpdateProductModal from "../components/UpdateProductModal.svelte";
  import DeleteProductModal from "../components/DeleteProductModal.svelte";

  // Import the methods and store
  import {
    fetchProducts,
    subscribeToProductUpdates,
  } from "../services/inventory";
  import { products } from "../stores/products";

  // Local state
  let showAddModal = false;
  let showUpdateModal = false;
  let showDeleteModal = false;
  let selectedProduct = null;

  // Lifecycle: Load existing products and subscribe to real-time updates
  onMount(async () => {
    try {
      // Fetch products and update store
      await fetchProducts();
      console.log("Products fetched successfully.");

      // Listen for product updates via WebSocket
      await subscribeToProductUpdates();
      console.log("Subscribed to product updates.");
    } catch (error) {
      console.error("Error during initialization in ProductTable:", error);
    }
  });

  // Modal Handlers
  const openAddModal = () => {
    console.log("Opening Add Product Modal");
    showAddModal = true;
  };

  const openUpdateModal = (product) => {
    selectedProduct = product;
    showUpdateModal = true;
  };

  const openDeleteModal = (product) => {
    selectedProduct = product;
    showDeleteModal = true;
  };
</script>

<div class="min-h-screen bg-gray-50 p-6">
  <h1 class="text-3xl font-bold mb-6 text-center text-blue-700">
    All Inventory
  </h1>

  <!-- Add Product Button -->
  <div class="flex justify-end mb-4">
    <Button on:click={openAddModal} color="success">Add Product</Button>
  </div>

  <!-- Product Table -->
  <Table>
    <TableHead>
      <TableHeadCell>ID</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Category</TableHeadCell>
      <TableHeadCell>Price</TableHeadCell>
      <TableHeadCell>Stock</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
      <TableHeadCell>Actions</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each $products as product}
        <TableBodyRow>
          <TableBodyCell>{product.id}</TableBodyCell>
          <TableBodyCell>{product.name}</TableBodyCell>
          <TableBodyCell>{product.category}</TableBodyCell>
          <TableBodyCell>${product.price.toFixed(2)}</TableBodyCell>
          <TableBodyCell>{product.stock}</TableBodyCell>
          <TableBodyCell>{product.status}</TableBodyCell>
          <TableBodyCell>
            <div class="flex space-x-2">
              <Button
                on:click={() => openUpdateModal(product)}
                color="warning"
                size="sm"
              >
                Edit
              </Button>
              <Button
                on:click={() => openDeleteModal(product)}
                color="failure"
                size="sm"
              >
                Delete
              </Button>
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  <!-- Modals -->
  {#if showAddModal}
    <AddProductModal bind:showAddModal />
  {/if}

  {#if showUpdateModal}
    <UpdateProductModal bind:showUpdateModal product={selectedProduct} />
  {/if}

  {#if showDeleteModal}
    <DeleteProductModal bind:showDeleteModal product={selectedProduct} />
  {/if}
</div>
