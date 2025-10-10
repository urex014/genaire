// controllers/productController.js

import Product from "../models/Product.js";
import multer from "multer";
import path from 'path'
import fs from 'fs'
import cloudinary from "../config/cloudinary.js";
import streamifier from 'streamifier'

//multer storage
const storage = multer.memoryStorage()
export const upload=multer({storage})

// @desc    Create a new product
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { title, price, description, quantity } = req.body;
    const image = req.file ? req.file.filename:null;
    
    if (!title || !price || !description || !quantity || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {folder:'products'},
        (error, result) => {
          if(error) return reject(error);
          resolve(result)
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    const product = new Product({ title, price, description, image:uploadResult.secure_url, quantity });
    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
    req.file.stream.pipe(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
