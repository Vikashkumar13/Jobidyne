import express from "express";

import { login, logout, register, updateProfile } from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

//USER-> ROUTES
router.route("/register").post(singleUpload, register);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

export default router;

