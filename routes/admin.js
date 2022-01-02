
import express from 'express';


import adminController from "../controllers/admin.js";

const router = express.Router();



//post the new product
router.post('/add-product', adminController);



export default router;
