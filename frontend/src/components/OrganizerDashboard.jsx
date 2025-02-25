import React, { useEffect, useState } from "react";
import axios from "axios";
 
const OrganizerDashboard = () => {
  const [eventCount, setEventCount] = useState(0);
  const [genreCounts, setGenreCounts] = useState({});
  const [popularGenre, setPopularGenre] = useState("");
  const [recentEvents, setRecentEvents] = useState([]);
 
  // Fetch Event Data from Backend
  useEffect(() => {
    const fetchEventData = async () => {
      try {
const response = await axios.get("http://localhost:3000/api/events");
 
        if (response.status === 200) {
          const events = response.data.data;
          console.log("Fetched Events:", events);
 
          // Set Total Event Count
          setEventCount(events.length);
 
          // Count Events by Genre
          const genreMap = {};
          events.forEach((event) => {
            if (event.genre_name) {
              genreMap[event.genre_name] = (genreMap[event.genre_name] || 0) + 1;
            }
          });
          setGenreCounts(genreMap);
 
          // Determine Most Popular Genre
          const mostPopular = Object.entries(genreMap).reduce(
            (a, b) => (b[1] > a[1] ? b : a),
            ["None", 0]
          );
          setPopularGenre(mostPopular[0]);
 
          // Set Recent Events (Last 5 Added)
          setRecentEvents(events.slice(-5).reverse());
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
 
    fetchEventData();
  }, []);
 
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">🎉 Event Dashboard</h1>
 
      {/* Main Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Total Events */}
        <div className="bg-blue-200 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold">Total Events</h2>
          <p className="text-5xl mt-4">{eventCount}</p>
        </div>
 
        {/* Most Popular Genre */}
        <div className="bg-green-200 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold">Most Popular Genre</h2>
          <p className="text-3xl mt-4">{popularGenre || "No Data"}</p>
        </div>
 
        {/* Genres with Event Count */}
        <div className="bg-orange-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Events by Genre</h2>
          {Object.keys(genreCounts).length > 0 ? (
            <ul className="mt-4 space-y-2">
              {Object.entries(genreCounts).map(([genre, count]) => (
                <li key={genre} className="text-lg">
                  {genre}: {count} Event(s)
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4">No genres available</p>
          )}
        </div>
      </div>
 
      {/* Recent Events */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">🗓️ Recent Events</h2>
        {recentEvents.length > 0 ? (
          <ul className="space-y-4">
            {recentEvents.map((event, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-200 transition"
              >
                <strong>{event.event_name}</strong> - {event.genre_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent events available.</p>
        )}
      </div>
    </div>
  );
};
 
export default OrganizerDashboard;


