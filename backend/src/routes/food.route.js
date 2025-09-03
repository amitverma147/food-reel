import express from "express";
import { createFoodItem, getAllFoodItems } from "../controllers/food.controller.js";
import { authFoodPartnerMiddleware, authUserMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../utils/upload/multer.js";

const router = express.Router();

router.post(
  "/",
  authFoodPartnerMiddleware,
  upload.single("video"),
  createFoodItem
);

router.get("/", authUserMiddleware,getAllFoodItems )

export default router;
