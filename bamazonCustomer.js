var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Carlos23",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    purchase();
});

function purchase() {
    connection.query('SELECT id, product_name, department_name, price, stock_quantity FROM products', (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "what would you like to buy?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name + " for $ " + results[i].price + " | Department: " + results[i].department_name + "| Stock: " + results[i].stock_quantity)
                    }
                    return choiceArray;
                }
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to buy?"
            }
        ]).then(function (answer) {
            var itemArray = answer.choice.split(" ");
            var currentStock = itemArray[8];
            var updatedStock = currentStock - parseInt(answer.amount);
            var cost = parseInt(itemArray[3]) * parseInt(answer.amount);
            if (currentStock >= parseInt(answer.amount)) {
                console.log("Thank you for shopping! Your total cost was $" + cost);
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: updatedStock
                    },
                    {
                        product_name: itemArray[0]
                    }
                ], function (err) {
                    if (err) throw err;
                    shopMore();
                });
            } else {
                console.log("Sorry, we do not have enough in stock. Maybe buy less?");
                purchase();
            }
        })
    });
}

function shopMore() {
    inquirer.prompt([
        {
            name: "continue",
            type: 'confirm',
            message: "Would you like to continue shopping?"
        }
    ]).then(function (answer) {
        if (answer.continue) {
            purchase();
        } else {
            console.log("Hope to see you soon!");
            connection.end();
        }
    })
}