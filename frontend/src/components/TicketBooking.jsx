import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const TicketBooking = () => {
  const aId = localStorage.getItem('user');
  const userId = JSON.parse(aId).id;
  const location = useLocation();
  const { event, bookingDetails } = location.state || {}; // Get event details from state
  
  const [formData, setFormData] = useState({
    ticketType: 'general',
    quantity: 1,
  });
  
  const ticketTypes = {
    general: event.general_ticket_price,
    vip: event.vip_ticket_price,
    earlybird: event.early_bird_ticket_price,
  };

  const [ticketPrice, setTicketPrice] = useState(ticketTypes.general);
  const [ticketDetails, setTicketDetails] = useState([]);
  const navigate = useNavigate();

  const capitalizeFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? Number(value) : value,
    });

    if (name === 'ticketType') {
      setTicketPrice(ticketTypes[value]);
    }
  };

  const addTicketDetail = () => {
    if (ticketDetails.length < formData.quantity) {
      const newDetail = { name: '', gender: '', email: '', phone: '', dob: '' };
      setTicketDetails([...ticketDetails, newDetail]);
    }
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...ticketDetails];
    updatedDetails[index][name] = value;
    setTicketDetails(updatedDetails);
  };

  const handleDelete = (index) => {
    setTicketDetails(ticketDetails.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Capitalize ticket type
    const formattedTicketType = capitalizeFirstChar(formData.ticketType);
    const calculatedTotalPrice = ticketPrice * formData.quantity;

    // Capitalize gender in ticket details
    const updatedTicketDetails = ticketDetails.map(detail => ({
      ...detail,
      gender: capitalizeFirstChar(detail.gender),
    }));

    try {
      const response = await axios.post("http://localhost:3000/api/payments", {
        event_id: event.event_id, 
        user_id: userId,
        ticket_type: formattedTicketType,
        quantity: formData.quantity,
        price: ticketPrice,
        total_price: calculatedTotalPrice,
        ticket_details: updatedTicketDetails,
      });

      if (response.status === 201) {
        navigate("/confirmation", {
          state: {
            ticketType: formattedTicketType,
            quantity: formData.quantity,
            ticketPrice: ticketPrice,
            totalPrice: calculatedTotalPrice,
            ticketDetails: updatedTicketDetails,
            event,
          },
        });
      }
    } catch (error) {
      console.error("Booking failed:", error.response ? error.response.data : error.message);
      alert("Booking failed. Please try again.");
    }

    try {
      for (const ticket of updatedTicketDetails) {
        await axios.post("http://localhost:3000/api/attendees/register", {
          event_id: event.event_id,
          user_id: userId,
          ticketDetails: updatedTicketDetails, 
          ticket_type: formattedTicketType,
          ticket_price: ticketPrice
        });
      }

      console.log("All attendees registered successfully!");
    } catch (error) {
      console.error("Error saving attendee details:", error);
    }

    setFormData({ ticketType: "general", quantity: 1 });
    setTicketDetails([]);
  };

  return (
    <div className="bg-[#D9EAFD] shadow-lg mt-10 container mx-auto px-4 py-8">
      {event && (
        <div className="flex gap-8">
          <div className="w-1/2 pr-8">
            <img src={event.event_image} alt={event.event_name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="w-1/2">
            <h2 className="text-3xl font-semibold mb-4">{event.event_name}</h2>
            <p className="text-lg mb-4">{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#F1F3F8] p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">Book Now</h3>

        <div className="flex gap-8">
          {Object.entries(ticketTypes).map(([key, price]) => (
            <label key={key} className={`border-2 p-4 w-1/3 flex justify-center items-center rounded-lg cursor-pointer ${formData.ticketType === key ? 'bg-black text-white' : ''}`}>          
              <input type="radio" name="ticketType" value={key} checked={formData.ticketType === key} onChange={handleChange} className="hidden" />
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold">{capitalizeFirstChar(key)}</div>
                <div className="text-lg">${price}</div>
              </div>
            </label>
          ))}
        </div>

        <h4 className="text-lg font-semibold mt-6">Number of Tickets</h4>
        <div className="mb-6 flex gap-3">
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" max="10" className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md" required />
          <button type="button" onClick={addTicketDetail} className="p-2 bg-black shadow-lg text-white rounded-full flex justify-center items-center" disabled={ticketDetails.length >= formData.quantity}>+</button>
        </div>

        {ticketDetails.map((detail, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center justify-between">
              Ticket {index + 1} Details
              <button type="button" onClick={() => handleDelete(index)} className="text-red-600 text-xl hover:text-red-800">&#128465;</button>
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="name" value={detail.name} onChange={(e) => handleDetailChange(index, e)} placeholder="Name" className='w-full p-4 rounded-lg border-2 border-gray-300 shadow-md' required />
              <input type="date" name="dob" value={detail.dob} onChange={(e) => handleDetailChange(index, e)} className='w-full p-4 rounded-lg border-2 border-gray-300 shadow-md' required />
              <input type="text" name="phone" value={detail.phone} onChange={(e) => handleDetailChange(index, e)} placeholder="Phone Number" className='w-full p-4 rounded-lg border-2 border-gray-300 shadow-md' required />
              <input type="email" name="email" value={detail.email} onChange={(e) => handleDetailChange(index, e)} placeholder="Email" className='w-full p-4 rounded-lg border-2 border-gray-300 shadow-md' required />
              <select name="gender" value={detail.gender} onChange={(e) => handleDetailChange(index, e)} className='w-full p-4 rounded-lg border-2 border-gray-300 shadow-md' required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        ))}
        <button type="submit" className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black transition-all">Confirm Booking</button>
      </form>
    </div>
  );
};

export default TicketBooking;
