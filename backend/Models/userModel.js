import pool from "../config/db.js";

// Get all users
export const getAllUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM user_details");
  return rows; // Return all users
};

// Get user by ID
export const getUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM user_details WHERE user_id = $1", [id]);
  return rows[0]; // Return user if found
};

// Create a new user
export const createUser = async (user_name, email, password, role, user_image) => {
  const { rows } = await pool.query(
    `INSERT INTO user_details (user_name, email, password, role, user_image) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [user_name, email, password, role, user_image]
  );
  return rows[0]; // Return the created user
};

export const getUserEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM user_details WHERE email = $1", [email]);
  return rows[0]; // Return user if found
};
