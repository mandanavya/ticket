import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash, Pencil, Trash2 } from "lucide-react";
import EditEventModal from "./EditEventModal"; // Import the modal component

const LandingPageForOrganizer = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Fetch events when component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      console.error("User ID not found in localStorage");
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/${user.id}`);
        console.log("Fetched events:", response.data);
        setEvents(response.data);
        setFilteredEvents(response.data);

        // Extract unique genres dynamically
        const fetchedGenres = [...new Set(response.data.map(event => event.genre_name))];
        setGenres(fetchedGenres);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle genre selection filtering
  const handleGenreFilter = (genre) => {
    let updatedFilters = [...selectedGenres];

    if (updatedFilters.includes(genre)) {
      updatedFilters = updatedFilters.filter(item => item !== genre);
    } else {
      updatedFilters.push(genre);
    }

    setSelectedGenres(updatedFilters);

    if (updatedFilters.length === 0) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => updatedFilters.includes(event.genre_name));
      setFilteredEvents(filtered);
    }
  };

  // Delete event function
  const handleDeleteEvent = async (eventId) => {
    if (!eventId) {
      console.error("Error: Event ID is undefined");
      return;
    }

    console.log(`Attempting to delete event with ID: ${eventId}`);

    try {
      await axios.delete(`http://localhost:3000/events/delete/${eventId}`);

      // Remove event from state after successful deletion
      const updatedEvents = events.filter(event => event.event_id !== eventId);
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);

      console.log("Event deleted successfully.");
    } catch (error) {
      console.error("Error deleting event:", error.response ? error.response.data : error.message);
    }
  };

  // Edit event function
  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find(event => event.event_id === eventId);
    setCurrentEvent(eventToEdit);
    setIsEditModalOpen(true);
  };

  // Save edited event
  const handleSaveEvent = (updatedEvent) => {
    const updatedEvents = events.map(event =>
      event.event_id === updatedEvent.event_id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Genre Filters */}
      <aside className="w-1/4 p-6 bg-gray-800 text-white shadow-md">
        <h2 className="text-xl font-bold mb-4">Select Genre</h2>
        <ul>
          {genres.map((genre, index) => (
            <li key={index} className="mb-3">
              <label className="flex items-center cursor-pointer text-lg">
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreFilter(genre)}
                  className="mr-3 accent-gray-400"
                />
                {genre}
              </label>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="w-3/4 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">🎉 Your Events</h1>

        {/* Display Events */}
        {filteredEvents.length === 0 ? (
          <p className="text-xl text-center text-gray-600">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.event_id}
                className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl relative"
              >
                {/* Event Image */}
                <img
                  src={event.event_image || "https://via.placeholder.com/400x250"}
                  alt={event.event_name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 relative">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.event_name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{event.description.slice(0, 50)}...</p>
                  <div className="flex justify-between items-center text-gray-600 mb-2">
                    <span className="text-sm">📍 {event.location}</span>
                    <span className="text-sm">📅 {new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <span className="inline-block bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {event.genre_name}
                  </span>
                  {/* Delete and Edit Buttons */}
                  <div className="absolute bottom-3 right-3 flex gap-3">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEditEvent(event.event_id)}
                      className=" text-black p-2 rounded-full hover:bg-blue-600"
                    >
                      <Pencil />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteEvent(event.event_id)}
                      className=" text-black p-2 rounded-full hover:bg-red-600"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Edit Event Modal */}
      {isEditModalOpen && (
        <EditEventModal
          event={currentEvent}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default LandingPageForOrganizer;