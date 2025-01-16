<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { fetchLowStockProducts } from "../services/lowStock";

  let lowStockProducts = [];

  // Getting low stock-products
  onMount(async () => {
    try {
      const data = await fetchLowStockProducts();

      if (data.success) {
        lowStockProducts = data.data;
      } else {
        alert("Failed to fetch low stock products");
      }
    } catch (error) {
      console.error("Error fetching low stock products:", error);
      alert("Failed to fetch low stock products.");
    }
  });
</script>

<div class="bg-white p-6 rounded shadow">
  <h2 class="text-xl font-bold mb-4 text-center text-red-500">
    Low Stock Products
  </h2>

  <Table>
    <TableHead>
      <TableHeadCell>ID</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Category</TableHeadCell>
      <TableHeadCell>Stock</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each lowStockProducts as product}
        <TableBodyRow>
          <TableBodyCell>{product.id}</TableBodyCell>
          <TableBodyCell>{product.name}</TableBodyCell>
          <TableBodyCell>{product.category}</TableBodyCell>
          <TableBodyCell>{product.stock}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  {#if lowStockProducts.length === 0}
    <p class="text-center text-gray-500 mt-4">
      No low stock products available.
    </p>
  {/if}
</div>
