import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
    const navigate = useNavigate();

    const orgId = localStorage.getItem("user");
    console.log();
    
    const genres = [
        { name: "Music Concert" },
        { name: "Sports Event" },
        { name: "Tech Conference" },
        { name: "Art Exhibition" },
        { name: "Food Festival" },
        { name: "Business Summit" },
        { name: "Theater & Drama" },
        { name: "Comedy Show" },
        { name: "Film Screening" },
        { name: "Charity Event" }
    ];

    const [eventDetails, setEventDetails] = useState({
        event_name: "",
        event_image: "",
        description: "",
        date: "",
        location: "",
        general_tickets: "",
        vip_tickets: "",
        early_bird_tickets: "",
        general_ticket_price: "",
        vip_ticket_price: "",
        early_bird_ticket_price: "",
        genre_name: "",
        organizer_id: JSON.parse(orgId).id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/events', eventDetails);
            alert("Event added successfully!");
            navigate('/events')
            console.log("Response data:", response.data);
        } catch (error) {
            alert("Error adding event");
            console.error("Error response:", error.response);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
            <h1 className="text-3xl font-bold mb-4">Create an Event</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
                <input type="text" name="event_name" value={eventDetails.event_name} placeholder="Event Name" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
                <input type="text" name="event_image" value={eventDetails.event_image} placeholder="Event Image URL" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
                <textarea name="description" value={eventDetails.description} placeholder="Event Description" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
                <input type="date" name="date" value={eventDetails.date} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
                <input type="text" name="location" value={eventDetails.location} placeholder="Location" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />

                {/* Ticket Details */}
                <input type="number" name="general_tickets" value={eventDetails.no_of_general_tickets} placeholder="Number of General Tickets" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
                <input type="number" name="vip_tickets" value={eventDetails.no_of_vip_tickets} placeholder="Number of VIP Tickets" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
                <input type="number" name="early_bird_tickets" value={eventDetails.no_of_early_bird_tickets} placeholder="Number of Early Bird Tickets" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />

                {/* Ticket Pricing */}
                <input type="number" name="general_ticket_price" value={eventDetails.general_ticket_price} placeholder="General Ticket Price" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
                <input type="number" name="vip_ticket_price" value={eventDetails.vip_ticket_price} placeholder="VIP Ticket Price" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
                <input type="number" name="early_bird_ticket_price" value={eventDetails.early_bird_ticket_price} placeholder="Early Bird Ticket Price" onChange={handleChange} className="w-full p-2 border rounded mb-2" required />

                {/* Genre Selection */}
                <select name="genre_name" value={eventDetails.genre_name} onChange={handleChange} className="w-full p-2 border rounded mb-2" required>
                    <option value="">Select Genre</option>
                    {genres.map((genre) => (
                        <option key={genre.name} value={genre.name}>{genre.name}</option>
                    ))}
                </select>

                {/* Organizer ID */}
                <input type="text" name="organizer_id" value={eventDetails.organizer_id} placeholder="Organizer ID" onChange={handleChange} className="w-full p-2 border rounded mb-2" disabled required />

                <button type="submit" className="w-full p-3 bg-black text-white rounded hover:bg-green-500">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;