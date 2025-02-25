import { getEvents,getEventsById,removeEventById } from "../Models/eventModel.js";
import dotenv from "dotenv"; 

dotenv.config();

export const fetchEvents = async (req, res) => {
  try {
    const { id } = req.params; // ✅ Extract organizer_id from URL

    if (!id) {
      return res.status(400).json({ error: "Organizer ID is required" });
    }

    const events = await getEventsById(id); // Pass ID to the model function
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events by id:", error.message);
    res.status(500).json({ error: "Error fetching events" });
  }
};

// Controller for deleting an event
export const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ error: "Event ID is required" });
      }
  
      const success = await removeEventById(id);
      if (success) {
        res.status(200).json({ message: "Event deleted successfully" });
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (error) {
      console.error("Error deleting event:", error.message);
      res.status(500).json({ error: "Error deleting event" });
    }
  };
  import { createClient } from '@supabase/supabase-js';

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  export const updateEvent = async (req, res) => {
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
  };


  export const fetchEventById = async (req, res) => {
    const { id } = req.params; // Get event ID from URL params
   
    if (!id) {
      return res.status(400).json({ error: "Event ID is required" });
    }
   
    try {
      const { data, error } = await supabase
        .from('event_details')
        .select('*')
        .eq('event_id', id)
        .single();  // Fetch a single event by ID
   
      if (error) {
        console.error("Error fetching event:", error.message);
        return res.status(500).json({ error: error.message });
      }
   
      if (!data) {
        return res.status(404).json({ message: 'Event not found' });
      }
   
      return res.json(data); // Return the event details
    } catch (error) {
      console.error("Error fetching event:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  export const fetchAllEvents = async (req, res) => {
  const { category } = req.query;
 
  try {
    let query = supabase.from('event_details').select('*');
 
    // If a category is provided, filter by category
    if (category && category !== 'All') {
      query = query.eq('genre_name', category);
    }
 
    const { data, error } = await query;
 
    if (error) {
      console.error('Database error:', error.message); // Log detailed error
      return res.status(500).json({ error: error.message });
    }
 
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }
 
    res.json(data); // Return the event data
  } catch (err) {
    console.error('Error fetching events:', err.message); // Log server error
    res.status(500).json({ error: err.message });
  }
};