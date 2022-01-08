import express from "express";
const Router = express.Router();

//ProductModel
import Product from "../models/product.js";
import User from "../models/user.js"

/**
 * router:http://localhost:3000/product/post
 * method:POST
 * parameter:none
 * description:post the new product
 * access:public
 */

Router.post("/post", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json({ data: newProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * router:http://localhost:3000/product/get
 * method:GET
 * parameter:none
 * description:get the all product
 * access:public
 */
Router.get("/get", async (req, res) => {
  await Product.findAll().
  then((product) => {
      return res.status(200).json({ product });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

/**
 * router:http://localhost:3000/product/get/:id
 * method:GET
 * parameter:id
 * description:get the product according to id
 * access:private
 */

Router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByPk(id)
    .then((product) => {
      return res.status(200).json({ product });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

/**
 * router:http://localhost:3000/product/get/title
 * method:GET
 * parameter:none
 * description:get the product according to titles
 * access:private
 */

Router.get("/get_title", async (req, res) => {
  await Product.findAll({ where: { title: "ajith" }})
    .then((product) => {
      //console.log(product);
      return res.status(200).json({ product });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

/**
 * router:http://localhost:3000/product/update
 * method:PUT
 * parameter:none
 * description:update the product according to id
 * access:private
 */

Router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  await Product.update(
    {
      title: req.body.title,
      Price: req.body.price,
      ImageUrl: req.body.imageUrl,
      description: req.body.description,
    },
    { where: { id: id } }
  )
    .then((product) => {
      return res.status(200).json({ message: "successfully updated" });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

/**
 * router:http://localhost:3000/product/delete/:id
 * method:GET
 * parameter:id
 * description:delete  the product according to id
 * access:private
 */

Router.delete("/delete/:id",async(req,res)=>{
  const {id}=req.params;

  await Product.findByPk(id).then((product)=>{
    if(!product){
      return res.status(404).json({message:"product not found"});
    }else{
      product.destroy();
      return res.status(200).json({message:"successfully deleted"});
    }
      
  }).catch((error)=>{
    return res.status(500).json({ error: error.message });
  })

})


export default Router;