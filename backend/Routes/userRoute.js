import express from "express";
import { fetchUsers, fetchUserById, registerUser , loginUser} from "../Controllers/userController.js";

const router = express.Router();

// Routes
router.get("/", fetchUsers);           // GET all users
router.get("/:id", fetchUserById);     // GET user by ID
router.post("/register", registerUser); // POST new user
router.post("/login", loginUser)

export default router;
