import express from "express";

const Router = express.Router();

//dataModel
import User from "../models/user";

/**
 * route:http://localhost:3000/user/post
 * method: POST
 * parameter: none
 * description: creating a new user
 * assess: public
 */

Router.post("/post",async(req,res)=>{
    
})

export default Router;