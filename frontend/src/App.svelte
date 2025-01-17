<script>
  import { Router, Route, Link, navigate } from "svelte-routing";
  import { initializeWebsocket } from "./services/websocket";
  import { onMount } from "svelte";

  onMount(() => {
    initializeWebsocket();

    // Redirect to /inventory on initial load if the path is /
    if (window.location.pathname === "/") {
      navigate("/inventory");
    }
  });
</script>

<main class="min-h-screen bg-gray-100">
  <header
    class="bg-blue-500 text-white py-6 px-8 flex justify-between items-center"
  >
    <h1 id="main-heading" class="text-2xl font-bold">
      Real-Time Product Inventory Management
    </h1>
  </header>

  <Router>
    <nav class="bg-gray-200 py-4 px-8 flex space-x-4">
      <Link
        to="/inventory"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Inventory
      </Link>
      <Link
        to="/lowstock"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Low Stock
      </Link>
      <Link
        to="/categoryinsights"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Category Insights
      </Link>
    </nav>

    <section class="p-6">
      <Route
        path="/inventory"
        component={() => import("./pages/ProductTable.svelte")}
      />
      <Route
        path="/lowstock"
        component={() => import("./pages/StockMonitoring.svelte")}
      />
      <Route
        path="/categoryinsights"
        component={() => import("./pages/CategoryStockInsights.svelte")}
      />
    </section>
  </Router>
</main>
