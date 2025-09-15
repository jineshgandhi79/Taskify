import express from "express";
import {signup,login, changePassword} from "../controllers/authticate.controller.js";
import verifyCredentials from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/changePassword',verifyCredentials,changePassword);

export default router;