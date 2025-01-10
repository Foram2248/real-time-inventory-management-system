<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Button } from "flowbite-svelte";
  import AddProductModal from "./AddProductModal.svelte";
  import UpdateProductModal from "./UpdateProductModal.svelte";
  import DeleteProductModal from "./DeleteProductModal.svelte";
  import { onMount } from "svelte";
  import io from "socket.io-client";

  let products = [];
  const socket = io("https://inventory-backend-service-178433520974.us-central1.run.app");

  let showAddModal = false;
  let showUpdateModal = false;
  let showDeleteModal = false;
  let selectedProduct = null;
  console.log("Component called.....")
  onMount(() => {
    socket.emit("get_products");

    socket.on("products_data", (data) => {
      products = data;
    });

    socket.on("product_update", (update) => {
      if (update.action === "add") {
        products = [...products, update.item];
      } else if (update.action === "update") {
        const index = products.findIndex((p) => p.id === update.id);
        if (index !== -1) {
          products[index][update.field] = update.value;
          products = [...products];
        }
      } else if (update.action === "delete") {
        products = products.filter((p) => p.id !== update.id);
      }
    });
  });

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
    <Button on:click={() => openAddModal()} color="success">Add Product</Button>
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
      {#each products as product}
        <TableBodyRow>
          <TableBodyCell>{product.id}</TableBodyCell>
          <TableBodyCell>{product.name}</TableBodyCell>
          <TableBodyCell>{product.category}</TableBodyCell>
          <TableBodyCell>${product.price.toFixed(2)}</TableBodyCell>
          <TableBodyCell>{product.stock}</TableBodyCell>
          <TableBodyCell>{product.status}</TableBodyCell>
          <TableBodyCell>
            <div class="flex space-x-2">
              <Button on:click={() => openUpdateModal(product)} color="warning" size="sm">Edit</Button>
              <Button on:click={() => openDeleteModal(product)} color="failure" size="sm">Delete</Button>
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  <!-- Modals -->
  {#if showAddModal}
  <AddProductModal bind:showAddModal socket={socket} />
{/if}

  {#if showUpdateModal}
    <UpdateProductModal bind:showUpdateModal socket={socket} product={selectedProduct} />
  {/if}

  {#if showDeleteModal}
    <DeleteProductModal bind:showDeleteModal socket={socket} product={selectedProduct} />
  {/if}
</div>
