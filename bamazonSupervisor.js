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
    supervisorView();
});

function supervisorView() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department", "Exit application"],
            name: "choice"
        }
    ]).then(function(res) {

        if (res.choice == "View Product Sales by Department") {
            viewSales();
        } else if (res.choice == "Exit application") {
            connection.end();
        }else {
            createDepartment();
        };
    });
};

function viewSales() {

    connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_cost, " + 
    "SUM (products.product_sales) AS total FROM departments INNER JOIN products ON departments.department_name " + 
    "= products.department_name WHERE departments.department_name = products.department_name GROUP BY products.department_name", 
    function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            var total = res[i].total;
            if (total == null) {
                total = 0;
            };
            var totalProfit = total - res[i].over_head_cost;
            console.log("------------------------------------------------------------------------");
            console.log("Department ID : " + res[i].department_id + " | " + "Department Name : " + res[i].department_name 
            + " | " + "Over Head Cost : $" + res[i].over_head_cost + " | " + "Product Sales : $" + total + " | " 
            + "Total Profit : $" + totalProfit)
            console.log("------------------------------------------------------------------------");
        }

        supervisorView();
    });
};

function createDepartment() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the department you wish to add?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the over head cost of this department?",
            name: "cost"
        }
    ]).then(function(res) {
        connection.query("INSERT INTO departments SET ?", {
            department_name: res.department,
            over_head_cost: res.cost,
        }, function(err, res) {
            if (err) throw err;
            console.log("------------------------------------------------------------------------");
            console.log("This department has been added");
            console.log("------------------------------------------------------------------------");
            supervisorView();
        });
    });
};