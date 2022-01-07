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
import user from "./controllers/user.js";



app.use(express.json()); 

// finding the user for auth =========================================================>
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

//controllers
app.use('/product', controllers);
app.use('/user',user);


// RELATION SHIP 1 TO MANY
Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
