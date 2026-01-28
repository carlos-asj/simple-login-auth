import express from "express";
import { addNewUser, getAllUsers, getUser, checkEmail, userLogin, deleteUser, updateUser } from "../controller/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUser);

router.post("/register", addNewUser);
router.post("/check-email", checkEmail);
router.post("/login", userLogin);

router.delete("/users/:id", deleteUser);

router.put("/users/:id", updateUser);

export default router;