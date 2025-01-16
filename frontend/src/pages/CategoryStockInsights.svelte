<script>
  import { onMount } from "svelte";
  import { fetchCategoryStockInsights } from "../services/categoryInsights";

  let insights = [];
  let loading = true;

  // Getting category stock insights
  const loadInsights = async () => {
    try {
      const data = await fetchCategoryStockInsights();
      if (data.success) {
        insights = data.data;
      } else {
        console.error("Error fetching insights:", data.error);
        alert("Failed to fetch insights.");
      }
    } catch (error) {
      console.error("Error fetching insights:", error);
      alert("Failed to fetch insights.");
    } finally {
      loading = false;
    }
  };

  onMount(loadInsights);
</script>

<div class="min-h-screen bg-gray-50 p-6">
  <h1 class="text-2xl font-bold mb-6 text-center text-blue-700">
    Category-Based Stock Insights
  </h1>

  {#if loading}
    <p class="text-center text-gray-500">Loading insights...</p>
  {:else}
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 px-4 py-2">Category</th>
          <th class="border border-gray-300 px-4 py-2">Product</th>
          <th class="border border-gray-300 px-4 py-2">Total Stock</th>
          <th class="border border-gray-300 px-4 py-2">Grouping Level</th>
        </tr>
      </thead>
      <tbody>
        {#each insights as insight}
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 px-4 py-2">
              {insight.category_name || "All Categories"}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {insight.product_name || "All Products"}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {insight.total_stock}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {insight.grouping_level}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
