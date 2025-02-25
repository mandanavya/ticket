import { getAllUsers, getUserById, createUser , getUserEmail } from "../Models/userModel.js";
import dotenv from 'dotenv'; 
import { supabase } from '../supabaseClient.js'; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { log } from "console";
// import { JWT_EXPIRES_IN, JWT_SECRET } from "../.env";
dotenv.config();
// Get all users
export const fetchUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Get user by ID
export const fetchUserById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    res.status(500).json({ error: "Error fetching user by ID" });
  }
};

// Create (Register) a new user
export const registerUser = async (req, res) => {
  try {
    const { user_name, email, password, role, user_image } = req.body;

    // Validate input
    if (!user_name || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Now create the user with the hashed password
    const newUser = await createUser(user_name, email, hashedPassword, role, user_image); // Pass the hashed password

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN, // Use your JWT expiration time from env
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debugging: Log incoming data
    console.log("Incoming email:", email);
    console.log("Incoming password:", password);

    // Fetch user data based on email
    const { data, error } = await supabase
      .from('user_details') // Replace with your actual table name
      .select('user_id, password,user_name , role') // Fetch both ID and password
      .eq('email', email)
      .limit(1);

    if (error) {
      console.error("Supabase query error:", error.message);
      throw new Error('Error fetching user data');
    }

    if (!data || data.length === 0) {
      console.log("User not found");
      throw new Error('Email or password is incorrect');
    }

    const user = data[0]; // Define the user
    console.log("Data is:", user.password);
    console.log("PASS IS:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      console.log("Incorrect password");
      throw new Error('Email or password is incorrect');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN } // Expiration time for the token
    );

    res.status(200).json({
      success: true,
      message: 'User Logged In successfully',
      data: {
        token,
        user: { id: user.user_id, email , name : user.user_name , role : user.role}, // Return necessary user details
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: error.message });
  }
};