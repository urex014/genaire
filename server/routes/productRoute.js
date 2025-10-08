// routes/productRoutes.js

import express from "express";
import {
  createProduct,
  upload,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();
//create product
router.post('/', upload.single("image"), createProduct)
router.get('/', getProducts)      // GET all products

router.route("/:id")
  .get(getProductById)   // GET one product
  .put(updateProduct)    // UPDATE product
  .delete(deleteProduct);// DELETE product

export default router;
