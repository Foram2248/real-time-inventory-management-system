<script>
  import { onMount } from "svelte";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Button,
  } from "flowbite-svelte";
  import AddProductModal from "../components/AddProductModal.svelte";
  import UpdateProductModal from "../components/UpdateProductModal.svelte";
  import DeleteProductModal from "../components/DeleteProductModal.svelte";
  import {
    fetchProducts,
    subscribeToProductUpdates,
  } from "../services/inventory";
  import { products } from "../stores/products";
  import { categories } from "../stores/categories";
  import { fetchCategories } from "../services/categories";

  let showAddModal = false;
  let showUpdateModal = false;
  let showDeleteModal = false;
  let selectedProduct = null;

  onMount(async () => {
    try {
      await fetchProducts();
      await subscribeToProductUpdates();

      categories.subscribe((currentCategories) => {
        if (!currentCategories || currentCategories.length === 0) {
          fetchCategories();
        }
      });
    } catch (error) {
      console.error("Error during initialization in ProductTable:", error);
    }
  });
  // add product modal
  const openAddModal = () => {
    showAddModal = true;
  };
  // update product modal
  const openUpdateModal = (product) => {
    let selectedCategoryId = null;
    categories.subscribe((currentCategories) => {
      const matchingCategory = currentCategories.find(
        (cat) =>
          cat.category_name.trim().toLowerCase() ===
          product.category.trim().toLowerCase()
      );
      selectedCategoryId = matchingCategory ? matchingCategory.id : null;
    });

    selectedProduct = {
      ...product,
      category_id: selectedCategoryId,
    };
    showUpdateModal = true;
  };

  // delete product modal
  const openDeleteModal = (product) => {
    selectedProduct = product;
    showDeleteModal = true;
  };
</script>

<div class="min-h-screen bg-gray-50 p-6">
  <h1 class="text-3xl font-bold mb-6 text-center text-blue-700">
    All Inventory
  </h1>

  <div class="flex justify-end mb-4">
    <Button on:click={openAddModal} color="success">Add Product</Button>
  </div>

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
