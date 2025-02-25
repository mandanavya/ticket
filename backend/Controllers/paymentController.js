import pool from "../config/db.js";
 
// Create a new payment entry
export const createPayment = async (req, res) => {
    try {
        const { event_id, user_id, price, quantity, ticket_type } = req.body;
       
        // console.log('req body - ',req.body);
       
        if (!event_id || !user_id || !price || !quantity || !ticket_type) {
            return res.status(400).json({ error: "All fields are required." });
        }
 
        const total_price = price * quantity;
 
        const query = `
            INSERT INTO payment_details (event_id, user_id, price, quantity, total_price, ticket_type)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const values = [event_id, user_id, price, quantity, total_price, ticket_type];
 
        const { rows } = await pool.query(query, values);
        res.status(201).json(rows[0]);  
    } catch (error) {
        console.error("Error creating payment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
 
// Get all payments
export const getAllPayments = async (req, res) => {
    try {
        const query = "SELECT * FROM payment_details;";
        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
 
// Get a specific payment by ID
export const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "SELECT * FROM payment_details WHERE payment_id = $1;";
        const { rows } = await pool.query(query, [id]);
 
        if (rows.length === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }
 
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
 
// Update a payment
export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { price, quantity, ticket_type } = req.body;
 
        // Fetch the current data
        const existingPayment = await pool.query("SELECT * FROM payment_details WHERE payment_id = $1;", [id]);
 
        if (existingPayment.rows.length === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }
 
        const oldPayment = existingPayment.rows[0];
        const newPrice = price || oldPayment.price;
        const newQuantity = quantity || oldPayment.quantity;
        const newTotalPrice = newPrice * newQuantity;
        const newTicketType = ticket_type || oldPayment.ticket_type;
 
        const query = `
            UPDATE payment_details
            SET price = $1, quantity = $2, total_price = $3, ticket_type = $4
            WHERE payment_id = $5 RETURNING *;
        `;
        const values = [newPrice, newQuantity, newTotalPrice, newTicketType, id];
 
        const { rows } = await pool.query(query, values);
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error updating payment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
 
// Delete a payment
export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM payment_details WHERE payment_id = $1 RETURNING *;";
        const { rows } = await pool.query(query, [id]);
 
        if (rows.length === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }
 
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
        console.error("Error deleting payment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
