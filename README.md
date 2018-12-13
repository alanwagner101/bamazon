# bamazon

Video tutorial : 
https://www.youtube.com/watch?v=1_BPKVP9FYI

This application uses both NodeJS and mySQL to create a mock amazon application.
There are three sections to this app;
Customer/ User Experience : Used for looking at and purchasing items.
  node bamazonCustomer.js
Manager View : which is used for viewing inventory of each item, adding inventory, and adding new products.
  node bamazonManager.js
Supervisor View : which is used for setting up and viewing departments and monitoring profit margins.
  node bamazonSupervisor.js
  
Upon entering each .js file in node you will be presented with prompts, follow the prompts to complete each of the tasks laid out above.

Both the manager and customer .js files use a database table called products to house the information. 
The supervisor .js file uses both the products table and a table called departments to store the information.

