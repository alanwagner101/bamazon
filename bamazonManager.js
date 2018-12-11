var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Signmeon1?",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadID);
    managerView()
});

function managerView() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit Application"],
                name: "choice"
            }
        ]).then(function (res) {

            if (res.choice == "View Products for Sale") {
                viewProducts();
            } else if (res.choice == "View Low Inventory") {
                viewInventory();
            } else if (res.choice == "Add to Inventory") {
                addInventory();
            } else if (res.choice == "Exit Application") {
                exit()
            }else {
                addProducts()
            };

        });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("------------------------------------------------------------------------");
            console.log("ID : " + res[i].id + " | " + "PRODUCT NAME : " + res[i].product_name + " | "
                + "PRICE : $" + res[i].price + " | " + "IN STOCK : " + res[i].stock_quantity);
            console.log("------------------------------------------------------------------------");
        };
        managerView();
    });
};

function viewInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log("------------------------------------------------------------------------");
                console.log("ID : " + res[i].id + " | " + "PRODUCT NAME : " + res[i].product_name + " | "
                    + "PRICE : $" + res[i].price + " | " + "IN STOCK : " + res[i].stock_quantity);
                console.log("------------------------------------------------------------------------");
            };
        };
        managerView();
    });
};

function addInventory() {
    var id;
    var amount;

    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter item ID you wish to add to.",
                name: "id"
            }
        ]).then(function (res) {
            id = res.id;
            connection.query("SELECT * FROM products", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    if (id == res[i].id) {
                        console.log("------------------------------------------------------------------------");
                        console.log("ID : " + res[i].id + " | " + "PRODUCT NAME : " + res[i].product_name + " | "
                            + "PRICE : $" + res[i].price + " | " + "IN STOCK : " + res[i].stock_quantity);
                        console.log("------------------------------------------------------------------------");
                        amount = res[i].stock_quantity;
                    };
                };
                inquirer
                .prompt([
                    {
                        type: "input",
                        message: "How much would you like to add?",
                        name: "add"
                    }
                ]).then(function(res) {
                    var add = res.add;
                    var newStock = parseInt(amount) + parseInt(add);
                    connection.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: newStock
                        },
                        {
                            id: id
                        }
                    ], function(err, res) {
                        if (err) throw err;
                        console.log("------------------------------------------------------------------------");
                        console.log("Inventory has been updated!");
                        console.log("------------------------------------------------------------------------");
                        managerView();
                    });
                });
            });

        });
};

function addProducts() {

    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the item you wish to add?",
            name: "item"
        },
        {
            type: "input",
            message: "What is the department this item belongs to",
            name: "department"
        },
        {
            type: "input",
            message: "How much does the item cost",
            name: "price"
        },
        {
            type: "input",
            message: "How many of this item do you want to add to stock",
            name: "stock"
        }
    ]).then(function(res) {
        connection.query("INSERT INTO products SET ?", {
            product_name: res.item,
            department_name: res.department,
            price: res.price,
            stock_quantity: res.stock
        }, function(err, res) {
            if (err) throw err;
            console.log("------------------------------------------------------------------------");
            console.log("This item has been added");
            console.log("------------------------------------------------------------------------");
            managerView();
        });
    });

};

function exit() {
    connection.end();
}