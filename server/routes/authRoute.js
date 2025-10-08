import express from 'express';
//i will get users by jwt token instead of ids 
import {
  register, updateUser, deleteUser, getUser, login
} from "../controllers/authController.js";

const router = express.Router();

router.post('/', register),
router.post('/', login)
router.get('/', getUser)
