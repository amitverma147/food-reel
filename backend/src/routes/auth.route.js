import express from "express";
import { foodPartnerLogin, foodPartnerLogout, loginUser, logoutUser, registerFoodPartner, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout",logoutUser)

router.post("/foodpartner/register",registerFoodPartner)
router.post("/foodpartner/login",foodPartnerLogin)
router.get("/foodpartner/logout",foodPartnerLogout)

export default router;
