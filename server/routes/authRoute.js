import express from 'express';
//i will get users by jwt token instead of ids 
import {
  register, login
} from "../controllers/authController.js";

const router = express.Router();

router.post('/register', register),
router.post('/login', login)
// router.get('/', getUser)

export default router