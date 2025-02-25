import express from "express";
import {
  registerAttendees,
  fetchAllAttendees,
  removeAttendee,
} from "../Controllers/attendeeController.js";

const router = express.Router();

// ✅ Register Attendees
router.post("/register", registerAttendees);

// ✅ Get All Attendees (No Event ID Required)
router.get("/attendees", fetchAllAttendees);

// ✅ Delete an Attendee
router.delete("/:attendee_id", removeAttendee);

export default router;
