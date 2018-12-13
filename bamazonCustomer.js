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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("------------------------------------------------------------------------");
            console.log("ID : " + res[i].id + " | " + "PRODUCT NAME : " + res[i].product_name + " | "
                + "PRICE : $" + res[i].price + " | " + "IN STOCK : " + res[i].stock_quantity);
            console.log("------------------------------------------------------------------------");
        };
        selectItem();
    });

});

function selectItem() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter your product ID here!",
                name: "item"
            }
        ]).then(function (res) {
            var item = res.item;
            var itemNumber;
            var stock;
            var price;
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    if (item == res[i].id) {
                        console.log("------------------------------------------------------------------------");
                        console.log("ID : " + res[i].id + " | " + "PRODUCT NAME : " + res[i].product_name + " | "
                            + "PRICE : $" + res[i].price + " | " + "IN STOCK : " + res[i].stock_quantity);
                        console.log("------------------------------------------------------------------------");
                        
                        itemNumber = i + 1;
                        stock = res[i].stock_quantity;
                        price = res[i].price;
                        product_sales = res[i].product_sales;
                    };
                };
                buyItem(itemNumber, stock, price, product_sales);
            });
        });
};

function buyItem(itemNumber, stock, price, product_sales) {
    var itemNumber = itemNumber;
    var stock = stock;
    var price = price;
    var sale;
    var product_sales = product_sales;

    inquirer
        .prompt([
            {
                type: "input",
                message: "How many would you like to purchase",
                name: "buy"
            }
        ]).then(function (res) {
            var amount = res.buy;
            if ((stock - amount) >= 0) {
                sale = price * amount;
                var newStock = stock - amount;
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newStock
                }, 
                {
                    id: itemNumber
                }], function(err) {
                    if (err) throw err;
                    console.log("------------------------------------------------------------------------");
                    console.log("The total amount was $" + sale)
                    console.log("Your Order has been placed! Please wait 3 - 4 business days for arrival!");
                    console.log("------------------------------------------------------------------------");
                    productSales(itemNumber, sale, product_sales);
                });
            } else {
                console.log("------------------------------------------------------------------------");
                console.log("Insufficient Quantity");
                console.log("There are only " + stock + " left in stock.")
                console.log("------------------------------------------------------------------------");
                buyItem(itemNumber, stock, price);
                return false;
            };
        });
};

function productSales(itemNumber, sale, product_sales) {
    var itemNumber = itemNumber;
    var sale = sale + product_sales;


    connection.query("UPDATE products SET ? WHERE ?", [{
        product_sales: sale
    }, 
    {
        id: itemNumber
    }], function(err) {
        if (err) throw err;
        connection.end();
    });
};
