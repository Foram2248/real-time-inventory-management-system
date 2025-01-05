CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    price FLOAT NOT NULL,
    stock INTEGER NOT NULL,
    status VARCHAR NOT NULL
);

INSERT INTO products (id, name, category, price, stock, status) VALUES
(1, 'Laptop', 'Electronics', 999.99, 10, 'Active'),
(2, 'Chair', 'Furniture', 49.99, 25, 'Active'),
(3, 'Desk', 'Furniture', 199.99, 15, 'Active'),
(4, 'Phone', 'Electronics', 799.99, 20, 'Active'),
(5, 'Tablet', 'Electronics', 499.99, 30, 'Active'),
(6, 'Headphones', 'Electronics', 149.99, 40, 'Active'),
(7, 'Monitor', 'Electronics', 299.99, 10, 'Active'),
(8, 'Keyboard', 'Electronics', 89.99, 50, 'Active'),
(9, 'Mouse', 'Electronics', 39.99, 60, 'Active'),
(10, 'Sofa', 'Furniture', 899.99, 5, 'Active');
