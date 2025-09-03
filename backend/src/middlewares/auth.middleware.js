import jwt from "jsonwebtoken";
import { FoodPartner } from "../models/foodpartner.model.js";
import dotenv from "dotenv";
dotenv.config();

const authFoodPartnerMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await FoodPartner.findById(decoded.id).select(
      "-password"
    );
    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }
    req.foodPartner = foodPartner;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
export default authFoodPartnerMiddleware;
