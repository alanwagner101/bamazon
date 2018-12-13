CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL
);

SELECT * FROM products;

ALTER TABLE products
ADD product_sales INTEGER(11);

CREATE TABLE departments (
	department_id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL,
    over_head_cost INTEGER(11) NOT NULL
);

SELECT * FROM departments;