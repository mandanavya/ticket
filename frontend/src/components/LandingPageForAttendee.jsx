// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Calendar, MapPin, Tag } from "lucide-react";
// import { useNavigate } from 'react-router-dom';

// const LandingPageForAttendee = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const navigate = useNavigate();

//   // Fixed list of event categories
//   const categories = [
//     "All", "Music Concert", "Sports Event", "Tech Conference",
//     "Art Exhibition", "Food Festival", "Business Summit",
//     "Theater & Drama", "Comedy Show", "Film Screening", "Charity Event"
//   ];

//   // Fetch events based on the selected category
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:3000/events/", {
//           params: { category: selectedCategory !== "All" ? selectedCategory : undefined }
//         });

//         setEvents(response.data || []); // Ensure data is an array
//         setError(null); // Reset error if fetch is successful
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to fetch events for the selected category.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [selectedCategory]);

//   return (
//     <div className="container mx-auto p-6 flex">
//       {/* Sidebar - Filters */}
//       <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold mb-4">Filters</h2>

//         {/* Category Filter */}
//         <div className="mb-4">
//           <h3 className="font-semibold mb-2">Event Categories</h3>
//           <ul className="space-y-2">
//             {categories.map(category => (
//               <li
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`cursor-pointer p-2 rounded-md text-gray-700 font-medium
//                     ${selectedCategory === category ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
//               >
//                 {category}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Event Cards Grid */}
//       <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading events...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : events.length > 0 ? (
//           events.map(event => (
//             <div
//               key={event.event_id}
//               className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
//             >
//               {/* Image Section with Overlay */}
//               <div className="relative">
//                 <img
//                   src={event.event_image || "https://via.placeholder.com/300"}
//                   alt={event.event_name}
//                   className="w-full h-48 object-cover rounded-t-lg"
//                 />
//                 <div className="absolute inset-0 bg-opacity-30 flex items-end p-4 text-white">
//                   <h2 className="text-lg font-semibold">{event.event_name}</h2>
//                 </div>
//               </div>

//               {/* Details Section */}
//               <div className="p-4">
//                 <div className="flex items-center space-x-2 text-gray-600">
//                   <Calendar className="h-5 w-5 text-blue-900" />
//                   <p>{event.date}</p>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-600 mt-1">
//                   <MapPin className="h-5 w-5 text-blue-900" />
//                   <p>{event.location}</p>
//                 </div>

//                 {/* Category Display */}
//                 <div className="flex items-center space-x-2 text-gray-600 mt-1">
//                   <Tag className="h-5 w-5 text-blue-900" />
//                   <p className="text-sm font-semibold text-gray-800 bg-gray-200 px-2 py-1 rounded-lg">
//                     {event.genre_name || "No Category Specified"}
//                   </p>
//                 </div>

//                 <p className="text-gray-700 mt-2">{event.description.slice(0, 25) + '...' || "No description available."}</p>

//                 <button onClick={() => navigate(`/event/${event.event_id}`, { state: event })} className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-600">No events found for the selected category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LandingPageForAttendee;

import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, MapPin, Tag } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const LandingPageForAttendee = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // Fixed list of event categories
  const categories = [
    "All", "Music Concert", "Sports Event", "Tech Conference",
    "Art Exhibition", "Food Festival", "Business Summit",
    "Theater & Drama", "Comedy Show", "Film Screening", "Charity Event"
  ];

  // Fetch events based on the selected category
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`Fetching events with category: ${selectedCategory}`);

        const response = await axios.get("http://localhost:3000/events/", {
          params: selectedCategory === "All" ? {} : { category: selectedCategory },
        });

        setEvents(response.data);
        setFilteredEvents(response.data);

        if (response.data.length === 0) {
          setError(`No events found for ${selectedCategory}.`);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError("Error fetching events. Please try again later.");
        } else {
          setError("An unexpected error occurred.");
        }
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCategory]); // Re-fetch events when the category changes

  return (
    <div className="container mx-auto p-6 flex">
      {/* Sidebar - Filters */}
      <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Category Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Event Categories</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer p-2 rounded-md text-gray-700 font-medium
                    ${selectedCategory === category ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image Section with Overlay */}
              <div className="relative">
                <img
                  src={event.event_image || "https://via.placeholder.com/300"}
                  alt={event.event_name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-opacity-30 flex items-end p-4 text-white">
                  <h2 className="text-lg font-semibold">{event.event_name}</h2>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-5 w-5 text-blue-900" />
                  <p>{event.date}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <MapPin className="h-5 w-5 text-blue-900" />
                  <p>{event.location}</p>
                </div>

                {/* Category Display */}
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <Tag className="h-5 w-5 text-blue-900" />
                  <p className="text-sm font-semibold text-gray-800 bg-gray-200 px-2 py-1 rounded-lg">
                    {event.genre_name || "No Category Specified"}
                  </p>
                </div>

                <p className="text-gray-700 mt-2">{event.description.slice(0, 25) + '...' || "No description available."}</p>

                <button onClick={() => navigate(`/event/${event.event_id}`, { state: event })} className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPageForAttendee;
