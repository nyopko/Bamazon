# Bamazon

**Bamazon** is a **Node.js/MySQL** enabled application that allows users to make purchases from a digital store like Amazon, demonstrating the ability to use CRUD techniques in MySQL.

Below is a rundown of each of Bamazon's functions.

Screenshots are available here: 
[Screenshots](https://drive.google.com/drive/folders/1GuitYSS48KCJEPMI2UHSZsOPYT-prEgU?usp=sharing)

### Storefront

When the user starts the application they are shown a welcome screen and are given the option to enter the shop or to exit.

### Exit

Simply put, this closes the application and ends all processes.

### Shop

This starts the connection to the MySql database and displays the items for sale and their information (price, id, etc). The user is then shown a list of the products. When they choose an item they are asked how many they would like to buy.


### In Stock

If the user selects a quantity less than the current stock. The purchase is successful and the user will be displayed a success message as well as the total cost of purchase, then taken back to the main menu.

### Insufficent Quantity

If the user selects a quantity greater than the total stock, they are given an insufficent quanity screen and taken back to the main menu.
