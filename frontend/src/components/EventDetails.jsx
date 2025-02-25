import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { UserCircle, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
 
const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
 
  console.log("Event ID:", id); // Debugging - Check the event ID
 
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Update the URL to point to your event details API
        const response = await axios.get(`http://localhost:3000/events/event_details/${id}`);
       
        if (response.data) {
          setEvent(response.data); // Assuming the response contains event data
        }
        } catch (err) {
            console.error("Error fetching event details:", err);
      }
    };
 
    fetchEventDetails();
  }, [id]); // Fetch event details when the component mounts or the event ID changes
 
  const handleReviewSubmit = () => {
    if (newReview.trim() !== "") {
      setReviews([...reviews, { id: reviews.length + 1, name: "Anonymous", comment: newReview }]);
      setNewReview("");
    }
  };
 
  const scrollReviews = (direction) => {
    const reviewsContainer = document.getElementById("reviews-container");
    const scrollAmount = 300;
    if (reviewsContainer) {
      reviewsContainer.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
 
  const handleBookNowClick = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/events/event_details/${id}`);
      console.log(response);
      
      if (response.data) {
        navigate("/ticket-booking", { state: { event, bookingDetails: response.data } });
      }
    } catch (err) {
      console.error("Error fetching booking details:", err);
    }
  };
  
  if (!event) {
    return <div className="text-center text-xl font-semibold mt-10">Loading event details...</div>;
  }
 
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-[#D9EAFD] shadow-lg rounded-xl">
      <img src={event.event_image} alt={event.event_name} className="w-full h-64 object-cover rounded-md mb-6" />
      <h1 className="text-3xl font-semibold mb-4">{event.event_name}</h1>
 
      <div className="flex justify-between items-center mb-4 mt-6">
        <div className="w-3/4 mr-10">
          <p className="text-gray-700">{event.description}</p>
        </div>
        <div className="w-1/4 pl-4">
          <button
            onClick={handleBookNowClick}
            className="ml-4 px-6 py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black transition-all"
          >
            Book Now
          </button>
        </div>
      </div>
 
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location}</p>
      <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
 
      <div className="bg-gray-100 p-4 mt-10 mb-10 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Performer</h2>
        <div className="flex flex-col gap-4">
          <UserCircle className="w-24 h-24 text-gray-600" />
          <p className="text-lg font-medium">{event.performer || "Performer details unavailable"}</p>
        </div>
      </div>
 
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
 
      <div className="relative">
        <button onClick={() => scrollReviews("left")}>
          <ChevronLeft className="text-gray-600" />
        </button>
 
        <div id="reviews-container" className="flex space-x-4 overflow-x-hidden p-4">
          {reviews.map((review) => (
            <div key={review.id} className="min-w-[250px] max-w-[300px] p-4 border rounded-md bg-gray-50 shadow-md flex-shrink-0">
              <p className="font-semibold truncate">{review.name}</p>
              <p className="text-gray-700 break-words">{review.comment}</p>
            </div>
          ))}
        </div>
 
        <button onClick={() => scrollReviews("right")}>
          <ChevronRight className="text-gray-600" />
        </button>
      </div>
 
      <div className="flex justify-between items-center mt-6">
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review..."
          className="w-full max-w-lg border-b border-gray-600 outline-none p-2 bg-transparent"
        />
 
        <button
          onClick={handleReviewSubmit}
          className="ml-4 px-6 py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black transition-all"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};
 
export default EventDetails;