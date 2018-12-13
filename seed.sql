USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4", "Electronics", 300, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 10, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pizza Rolls", "Food", 7, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acoustic Guitar", "Music", 200, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smart TV", "Electronics", 800, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Step Brothers", "Movies", 14, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Swimming Trunks", "Clothing", 25, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboard", "Music", 340, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Camping", 50, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Captain Crunch", "Food", 6, 44);

SELECT * FROM products;

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Electronics", 10000);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Clothing", 300);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Food", 250);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Music", 2000);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Movies", 310);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Camping", 150);

SELECT * FROM departments;