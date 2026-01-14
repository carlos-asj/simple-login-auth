import express from "express";
import { addNewUser, getAllUsers } from "../controller/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);

router.post("/user", addNewUser);

export default router;