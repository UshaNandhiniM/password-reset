import express from "express";
import {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
} from "../Contollers/userController.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:id", resetPassword);

export default router;
