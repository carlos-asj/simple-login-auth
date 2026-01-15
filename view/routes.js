import express from "express";
import { addNewUser, getAllUsers, getUser, userLogin } from "../controller/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/register", addNewUser);
router.post("/login", userLogin);

export default router;