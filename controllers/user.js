import express, { response } from "express";

const Router = express.Router();

//dataModel
import User from "../models/user.js";
import Product from "../models/product.js"

//Authentication routes =====================================================================================================================

/**
 * router:http://localhost:3000/user/private/post
 * method:POST
 * parameter:userId as forging key
 * description:user can post them own  new product
 * access:private
 */

 Router.post("/private/post", async (req, res) => {
    try {
      const newProduct = await req.user.createProduct(req.body);
      res.json({ data: newProduct });
     
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  /**
   * router:http://localhost:3000/user/private/get
   * method:GET
   * parameter:userId as forging key
   * description:get the user's specific product
   * access:private
   */
  
 Router.get("/private/get",async(req,res)=>{
     try{
        const userId = req.user.dataValues.id; 
        const productDetails =  await Product.findAll({where:{userId:userId}});
        return res.status(200).json(productDetails);

     }catch(error){
        return res.status(500).json({error:error.message});
     }
 })

 /**
   * router:http://localhost:3000/user/private/delete:id
   * method:DELETE
   * parameter: userId
   * description:delete specific user's  specific  product
   * access:private
   */
  
  Router.delete("/private/delete/:id",async(req,res)=>{
    try{
        const userId = req.user.dataValues.id;
        const {id} = req.params;
        console.log(id);
        const productDetails =  await Product.findAll({where:{userId:userId}});
        if(!productDetails){
            return res.status(404).json({message:"product not found"});
        }else{
            await Product.findByPk(id).then(((product)=>{
                Product.destroy({where:{id:id , userId:userId}});
                return res.status(200).json({message:"product successfully deleted"});
            }))
        }
    
    }catch(error){
       return res.status(500).json({error:error.message});
    }
})

Router.put("/private/update/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        const userId = req.user.dataValues.id;
        const {updateData} = await Product.update({
            title:req.body.title,
            price:req.body.price,
            imageUrl:req.body.imageUrl,
            description:req.body.description
        },
        { where: { id: id ,userId:userId} }
        )
        return res.status(200).json({message:"update successfully",messagess:updateData});

    }catch(error){
        return res.status(500).json({error:error.message});
    }
})
  

  

export default Router;