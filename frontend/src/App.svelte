<script>
    import ProductTable from "./components/ProductTable.svelte";
    import StockMonitoring from "./components/StockMonitoring.svelte";
    import CategoryStockInsights from "./components/CategoryStockInsights.svelte";

    let activeComponent = "ProductTable"; // Track active component

    const setActiveComponent = (component) => {
        activeComponent = component;
    };
</script>

<main class="min-h-screen bg-gray-100">
    <header class="bg-blue-500 text-white py-6 px-8">
        <h1 class="text-2xl font-bold">Real-Time Product Inventory Management</h1>
    </header>

    <nav class="bg-gray-200 py-4 px-8 flex space-x-4">
        <button
            class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            on:click={() => setActiveComponent("ProductTable")}
        >
            Inventory
        </button>
        <button
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            on:click={() => setActiveComponent("LowStockHighDemand")}
        >
            Low Stock
        </button>
        <button
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            on:click={() => setActiveComponent("CategoryStockInsights")}
        >
            Category Insights
    </button>
    </nav>

    <section class="p-6">
        {#if activeComponent === "ProductTable"}
            <ProductTable />
        {:else if activeComponent === "LowStockHighDemand"}
            <StockMonitoring />
        {:else if activeComponent === "CategoryStockInsights"}
            <CategoryStockInsights />
        {/if}
    </section>
</main>
