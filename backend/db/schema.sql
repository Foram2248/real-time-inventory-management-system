-- Categories Table
CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    category_name VARCHAR NOT NULL
);

-- Products Table
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name VARCHAR NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    price FLOAT NOT NULL,
    stock INTEGER NOT NULL,
    status VARCHAR NOT NULL
);

-- Insert data into categories table
INSERT INTO categories (id, category_name) VALUES
(1, 'Electronics'),
(2, 'Furniture'),
(3, 'Clothing'),
(4, 'Groceries'),
(5, 'Books'),
(6, 'Sports Equipment'),
(7, 'Beauty Products');

-- Insert data into products table
INSERT INTO products (id, name, category_id, price, stock, status) VALUES
(1, 'Laptop', 1, 999.99, 10, 'Active'),
(2, 'Chair', 2, 49.99, 25, 'Active'),
(3, 'Desk', 2, 199.99, 15, 'Active'),
(4, 'Phone', 1, 799.99, 20, 'Active'),
(5, 'Tablet', 1, 499.99, 30, 'Active'),
(6, 'Headphones', 1, 149.99, 40, 'Active'),
(7, 'Monitor', 1, 299.99, 10, 'Active'),
(8, 'Keyboard', 1, 89.99, 50, 'Active'),
(9, 'Mouse', 1, 39.99, 60, 'Active'),
(10, 'Sofa', 2, 899.99, 5, 'Active'),
(11, 'T-shirt', 3, 19.99, 100, 'Active'),
(12, 'Jeans', 3, 49.99, 75, 'Active'),
(13, 'Milk', 4, 2.99, 200, 'Active'),
(14, 'Bread', 4, 1.99, 150, 'Active'),
(15, 'Novel', 5, 14.99, 50, 'Active'),
(16, 'Notebook', 5, 4.99, 100, 'Active'),
(17, 'Football', 6, 29.99, 30, 'Active'),
(18, 'Tennis Racket', 6, 49.99, 20, 'Active'),
(19, 'Shampoo', 7, 5.99, 80, 'Active'),
(20, 'Lipstick', 7, 9.99, 50, 'Active');

