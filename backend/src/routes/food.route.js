import express from "express";
import { createFoodItem } from "../controllers/food.controller.js";
import authFoodPartnerMiddleware from "../middlewares/auth.middleware.js";
import upload from "../utils/upload/multer.js";

const router = express.Router();

router.post(
  "/",
  authFoodPartnerMiddleware,
  upload.single("video"),
  createFoodItem
);

export default router;
