import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Routes/userRoute.js";
import eventRoutes from "./Routes/eventRoute.js"
import pool from "./config/db.js";
import express from 'express';
import bodyParser from 'body-parser'; 
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
// const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Verify PostgreSQL connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL!"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/events", eventRoutes);

app.post('/api/events', async (req, res) => {
  const eventDetails = req.body;
  const { data, error } = await supabase.from('event_details').insert([eventDetails]);

  if (error) {
      res.status(500).json({ error: error.message });
  } else {
      res.status(200).json({ data });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("event_details")
      .select("event_name, genre_name");
 
    if (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: error.message });
    }
 
    console.log("Fetched Events:", data); // Log to verify output
 
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update event
app.put('/api/events/update/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const updatedData = req.body;

  try {
    const { data, error } = await supabase
      .from('event_details')
      .update(updatedData)
      .eq('event_id', eventId);

    if (error) {
      return res.status(500).json({ message: 'Error updating event', error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


app.get("/", (req, res) => res.send("🚀 API is running"));

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
