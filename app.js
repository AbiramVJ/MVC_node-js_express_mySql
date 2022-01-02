import express from "express";

//database connection
import sequelize from './util/database.js';

//model
import Product from "./models/product.js";
import User from "./models/user.js";

const app = express();

//controllers module
import controllers from "./controllers/admin.js";

app.use(express.json()); 

//controllers
app.use('/admin', controllers);

// RELATION SHIP 1 TO MANY
Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
