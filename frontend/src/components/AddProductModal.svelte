<script>
    export let showAddModal;
    export let socket;

    let newProduct = {
        id: "",
        name: "",
        category: "",
        price: 0,
        stock: 0,
        status: "Active",
    };

    const addProduct = () => {
    if (!newProduct.name || !newProduct.category) {
        alert("Name and Category are required!");
        return;
    }

    // Emit the product addition event
    socket.emit("add_product", newProduct, (response) => {
        if (response && response.success) {
            console.log("Product added successfully:", response.data);
            alert("Product added successfully!");
        } else {
            console.error("Error adding product:", response?.error || "Unknown error");
            alert("Failed to add product. Please try again.");
        }
    });

    // Reset the form
    newProduct = {
        name: "",
        category: "",
        price: 0,
        stock: 0,
        status: "Active",
    };

    showAddModal = false;
};
    const closeModal = () => {
        showAddModal = false;
    };
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg p-6 shadow-lg w-1/3">
        <h2 class="text-xl font-bold mb-4">Add Product</h2>
        <div class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium">Name</label>
                <input
                    id="name"
                    class="border rounded w-full p-2"
                    bind:value={newProduct.name}
                    placeholder="Enter product name"
                />
            </div>
            <div>
                <label for="category" class="block text-sm font-medium">Category</label>
                <input
                    id="category"
                    class="border rounded w-full p-2"
                    bind:value={newProduct.category}
                    placeholder="Enter product category"
                />
            </div>
            <div>
                <label for="price" class="block text-sm font-medium">Price</label>
                <input
                    id="price"
                    type="number"
                    class="border rounded w-full p-2"
                    bind:value={newProduct.price}
                    placeholder="Enter product price"
                />
            </div>
            <div>
                <label for="stock" class="block text-sm font-medium">Stock</label>
                <input
                    id="stock"
                    type="number"
                    class="border rounded w-full p-2"
                    bind:value={newProduct.stock}
                    placeholder="Enter stock quantity"
                />
            </div>
            <div>
                <label for="status" class="block text-sm font-medium">Status</label>
                <select
                    id="status"
                    class="border rounded w-full p-2"
                    bind:value={newProduct.status}
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
        </div>
        <div class="flex justify-end mt-4">
            <button
                class="bg-green-500 text-white px-4 py-2 rounded mr-2"
                on:click={addProduct}
            >
                Add
            </button>
            <button
                class="bg-gray-400 text-white px-4 py-2 rounded"
                on:click={closeModal}
            >
                Cancel
            </button>
        </div>
    </div>
</div>
