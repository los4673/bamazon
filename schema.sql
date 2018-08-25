DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products
(
    id INTEGER NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (40) NOT NULL,
    department_name VARCHAR
    (40) NOT NULL,
    price DECIMAL
    (10, 2) NOT NULL,
    stock_quantity INT
    (10) NOT NULL,
    PRIMARY KEY
    (id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Xbox", "Electronics", 200, 10),
        ('Playstation', "Electronics", 200, 10),
        ("TV_50_inch", "Electronics", 500, 10),
        ('Apples', 'Produce', 1, 10),
        ('Orange', 'Produce', 1, 10),
        ('Watermelon', 'Produce', 3, 10),
        ('Kitchen_Table', 'Furniture', 70, 10),
        ('Futon', 'Furniture', 150, 10),
        ('Matress', 'Furniture', 700, 10),
        ('Coffee Table', 'Furniture', 200, 10);
    SELECT *
    FROM products;