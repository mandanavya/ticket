import pool from "../config/db.js"; // ✅ Import PostgreSQL connection pool

// ✅ Save Attendee Details
export const saveAttendeeDetails = async (user_id, event_id, { name, gender, email, phone, dob } , ticket_type , ticket_price) => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO "attendee_details" (user_id, event_id, name, email, phone, gender, dob , ticket_type , ticket_price)
      VALUES ($1, $2, $3, $4, $5, $6, $7 , $8 , $9) RETURNING *;
    `;

    const values = [user_id, event_id, name, email, phone, gender, dob , ticket_type , ticket_price];

    const result = await client.query(query, values);
    return result.rows[0]; // Return the saved attendee record
  } catch (error) {
    console.error("Error saving attendee details:", error);
    throw error;
  } finally {
    client.release();
  }
};


// ✅ Get All Attendees (No Event ID Required)
export const getAllAttendees = async () => {
  const client = await pool.connect();
  try {
    const query = `SELECT * FROM "attendee_details";`; // Fetch all attendees
    const result = await client.query(query);

    return result.rows;
  } catch (error) {
    console.error("Error fetching all attendees:", error);
    throw error;
  } finally {
    client.release();
  }
};

// ✅ Delete an Attendee
export const deleteAttendee = async (attendee_id) => {
  const client = await pool.connect();
  try {
    const query = `DELETE FROM "attendee_details" WHERE attendee_id = $1 RETURNING *;`;
    const result = await client.query(query, [attendee_id]);

    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting attendee:", error);
    throw error;
  } finally {
    client.release();
  }
};
