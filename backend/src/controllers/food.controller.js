import { Food } from "../models/food.model.js";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../services/storage.service.js";

const createFoodItem = async (req, res) => {
  const id = uuidv4();

  try {
    const fileUploadResponse = await uploadFile(req.file.buffer, id);

    const newFood = await Food.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      videoUrl: fileUploadResponse,
      foodPartnerId: req.foodPartner._id,
    });

    return res.status(201).json({
      message: "Food item created successfully",
      food: newFood,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find({});
    return res
      .status(200)
      .json({ message: " Food items fetched successfully ", foodItems });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { createFoodItem, getAllFoodItems };
