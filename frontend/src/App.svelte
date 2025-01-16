<script>
  import { Router, Route, Link } from "svelte-routing";
  import { initializeWebsocket } from "./services/websocket";

  initializeWebsocket();
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
      <Route path="/">
        <div class="text-center text-gray-600">
          <h2 class="text-3xl font-bold">Welcome to the Inventory App</h2>
          <p class="mt-2">Select a tab above to view details.</p>
        </div>
      </Route>
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
