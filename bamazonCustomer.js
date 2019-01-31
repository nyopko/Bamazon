require('dotenv').config();
const inquirer = require("inquirer");
const colors = require("colors");
var mysql = require("mysql");
const keys = require('./keys');

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: keys.sql.password,
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected");
    homeScreen();
  });

function userPrompt() {

    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "What would you like to do?".green,
        choices: ["Shop".yellow, "Exit".red]
    }).then(function (answer) {
        //switch function
        switch (answer.menu) {
            case "Shop".yellow:
                storeApp();
                break;

            case "Exit".red:
                exitApp();
                break;
        }
    });
}

function storeApp() {
    productList();
    connection.query("SELECT * FROM items", function (err, res) {
      if (err) throw err;
      
      inquirer.prompt([{
          name: "items",
          type: "list",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].product_name);
            }
            return choiceArray;
          },
          message: "Which item would you like to purchase today?"
        },
        {
          name: "quantity",
          type: "input",
          message: "What quantity would you like to purchase?"
        }
        ])
        .then(function (answer) {
            // console.log(answer.items);
            // console.log(res[1].stock);
          var chosenItem;
          for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answer.items) {
              chosenItem = res[i];
            }
          }
  
          // determine if enough products are available
          if (chosenItem.stock > answer.quantity) {
            var newStock = chosenItem.stock - answer.quantity;
            connection.query(
              "UPDATE items SET ? WHERE ?",
              [
                {
                  stock: newStock
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
              function (error) {
                if (error) throw err;
                console.log("````````````````````````````````````````````````````````".rainbow); 
                console.log('\n');
                console.log("Purchase was successful!".yellow);
                console.log(colors.yellow("Total cost: $".yellow + answer.quantity * chosenItem.price));
                console.log('\n');
                console.log("````````````````````````````````````````````````````````".rainbow); 
                userPrompt();
              }
            );
          } else {
            /// Not enough in stock
            console.log("Insufficent Quanity".yellow);
            userPrompt();
          }
        });
    });
  }

function exitApp() {
    console.log("Thank you for shopping! Come back again sometime!".yellow);
}

function homeScreen(){
console.log("````````````````````````````````````````````````````````".rainbow);   
console.log('\n'); 
console.log("                 Welcome to BAMazon!!!".yellow);
console.log('\n');
console.log("````````````````````````````````````````````````````````".rainbow); 
// console.log("connected at " + connection.threadId);
userPrompt();
}

function productList(){
connection.query("SELECT * FROM items", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock > 0) {
              console.log(results[i].item_id + " ||| " + results[i].product_name + " ||| " + results[i].department_name + " ||| Price: $" + results[i].price + " ||| Quantity Available: " + results[i].stock);
              console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

              
            }
          }
})
}