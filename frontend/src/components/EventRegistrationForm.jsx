import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventRegistrationForm = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    genre: '' // Genre is now selected by the user
  });

  const [isFormOpen, setIsFormOpen] = useState(true); // Controls if the form is visible

  const generateAttendeeId = () => `attendee-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString();
    const registrationDetails = { ...formData, attendee_id: generateAttendeeId(), event_registered_at: currentTime };
    console.log('Registered:', registrationDetails);
    setIsFormOpen(false); // Hide form after successful registration

    // Navigate to TicketBooking after registration is confirmed
    navigate('/ticket-booking');
  };

  return (
    isFormOpen && (
      <div className="bg-[#D9EAFD] shadow-lg mt-50 container mx-auto px-4 py-8 flex flex-col gap-8">
        
        {/* Event Info */}
        <div className="flex gap-8">
          <div className="w-1/2 pr-8">
            <img
              src=""
              alt="Event"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Event Registration</h2>
            <p className="text-lg mb-4">Join us for an unforgettable experience, featuring top speakers and sessions.</p>
            <div className="text-lg font-semibold mb-4">
              <p><strong>Date:</strong> March 25, 2025</p>
              <p><strong>Time:</strong> 7:00 PM</p>
              <p><strong>Venue:</strong> Grand Conference Center, City Center</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-[#F1F3F8] p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">Register for Event</h3>

          {/* Genre Selection */}
          <div className="mb-6">
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Event Genre</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              required
            >
              <option value="">Select Genre</option>
              <option value="Music">Music</option>
              <option value="Comedy">Comedy</option>
              <option value="Product Launch">Product Launch</option>
              <option value="Tech">Tech</option>
              <option value="Coding">Coding</option>
              <option value="Health">Health</option>
              <option value="Food">Food</option>
              <option value="Art">Art</option>
            </select>
          </div>

          {/* Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select 
              id="gender" 
              name="gender" 
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              value={formData.gender} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="mb-6">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input 
              type="date" 
              id="dob" 
              name="dob" 
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              value={formData.dob} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex flex-col justify-center items-center relative border border-white rounded-[2%] p-4 text-white bg-black overflow-hidden transition-colors duration-300 ease-in-out 
              before:absolute before:inset-0 before:right-0 before:bg-white before:w-0 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:text-black 
              before:z-0 z-10 hover:cursor-pointer hover:shadow-lg max-w-xs"
            >
              <span className="relative z-10 transition-colors duration-0 ease-in-out text-center">
                Confirm Registration
              </span>
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default EventRegistrationForm;

