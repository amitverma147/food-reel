import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { FoodPartner } from "../models/foodpartner.model.js";

dotenv.config();
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully",
      newUser: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};

const registerFoodPartner = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await FoodPartner.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Food Partner already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFoodPartner = new FoodPartner({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newFoodPartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    await newFoodPartner.save();
    return res.status(201).json({
      message: "Food Partner registered successfully",
      newFoodPartner: {
        _id: newFoodPartner._id,
        name: newFoodPartner.name,
        email: newFoodPartner.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const foodPartnerLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const foodPartner = await FoodPartner.findOne({ email });
    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      foodPartner.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    return res.status(200).json({
      message: "Login successful",
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const foodPartnerLogout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};

export {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  foodPartnerLogin,
  foodPartnerLogout,
};
