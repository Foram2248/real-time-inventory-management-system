<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { onMount } from "svelte";

    let sales = [];

    // Fetch sales data on mount
    const fetchSales = async () => {
        try {
            const response = await fetch("https://inventory-backend-service-178433520974.us-central1.run.app/sales");
            const data = await response.json();
            if (data.success) {
                sales = data.data;
            } else {
                alert("Failed to fetch sales data.");
            }
        } catch (error) {
            console.error("Error fetching sales data:", error);
            alert("Error fetching sales data.");
        }
    };

    onMount(() => {
        fetchSales();
    });
</script>

<div class="min-h-screen bg-gray-50 p-6">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-700">Sales Table</h1>

    <Table>
        <TableHead>
            <TableHeadCell>Sale ID</TableHeadCell>
            <TableHeadCell>Product ID</TableHeadCell>
            <TableHeadCell>Product Name</TableHeadCell>
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Sale Date</TableHeadCell>
            <TableHeadCell>Duration (Days)</TableHeadCell>
            <TableHeadCell>Total Sales Value</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each sales as sale}
                <TableBodyRow>
                    <TableBodyCell>{sale.sale_id}</TableBodyCell>
                    <TableBodyCell>{sale.product_id}</TableBodyCell>
                    <TableBodyCell>{sale.product_name}</TableBodyCell>
                    <TableBodyCell>{sale.quantity}</TableBodyCell>
                    <TableBodyCell>{new Date(sale.sale_date).toLocaleString()}</TableBodyCell>
                    <TableBodyCell>{sale.sale_duration_days}</TableBodyCell>
                    <TableBodyCell>${sale.total_sales_value.toFixed(2)}</TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>
