import express from "express";
import { addNewUser, getAllUsers, getUser } from "../controller/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.post("/register", addNewUser);

export default router;