import pool from "../config/db.js";

export const getEvents = async (req,res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM event_details"
      );
      return rows;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to fetch events");
    }
  };
  

// Get all events by organizer ID
export const getEventsById = async (id) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM event_details WHERE organizer_id = $1",
      [id] 
    );
    return rows;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch events");
  }
};

// Delete event by ID
export const removeEventById = async (id) => {
    try {
      const result = await pool.query(
        "DELETE FROM event_details WHERE event_id = $1 RETURNING *",
        [id]
      );
      return result.rowCount > 0;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to delete event");
    }
  };