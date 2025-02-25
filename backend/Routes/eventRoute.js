import express from "express";
import { fetchAllEvents,fetchEvents, deleteEvent, updateEvent, fetchEventById } from "../Controllers/eventController.js";

const router = express.Router();

// ✅ Route now includes ":id" to capture organizer_id dynamically
router.get("/", fetchAllEvents);
router.get("/:id", fetchEvents);
router.delete("/delete/:id", deleteEvent);
router.put('/update/:eventId', updateEvent);
router.get("/event_details/:id",fetchEventById)
export default router;
