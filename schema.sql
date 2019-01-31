CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE items  (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(70) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL (10,2) NULL,
  stock INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO items (product_name, department_name, price, stock)
VALUES ("Coffee", "food", 5.00, 100), 
("Playstation 4", "electronics", 299.99, 10),
("Leather Jacket", "clothing", 69.99, 20),
("Cigarettes", "misc", 8.00, 50),
("iPhone XS", "electronics", 1000.00, 5),
("Baseball Hat", "clothing", 25.00, 70),
("Hockey Puck", "misc", 5.00, 200),
("Bananas", "food", 0.69, 1000),
("Gluten Free Bread", "food", 9.00, 40),
("Overwatch", "electronics", 29.99, 30);

