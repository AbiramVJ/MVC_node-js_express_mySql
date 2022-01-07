import express from "express";

//database connection
import sequelize from './util/database.js';

//model
import Product from "./models/product.js";
import User from "./models/user.js";
import Cart from "./models/cart.js";
import CartItem from "./models/Card-item.js";

const app = express();

//controllers module
import controllers from "./controllers/product.js";

app.use(express.json()); 

//controllers
app.use('/product', controllers);


// RELATION SHIP 1 TO MANY
Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

sequelize
  .sync()
  //.sync({force:true})
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
