// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import axios from "axios";
// const TicketBooking = () => {
//   const [formData, setFormData] = useState({
//     ticketType: 'general',
//     quantity: 1,
//   });
 
//   const [ticketPrice, setTicketPrice] = useState(50);
//   const ticketTypes = {
//     general: 50,
//     vip: 100,
//     earlybird: 40,
//   };
 
//   const [ticketDetails, setTicketDetails] = useState([]);
//   const navigate = useNavigate(); // useNavigate hook to navigate programmatically
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'quantity' ? Number(value) : value         ,
//     });
 
//     if (name === 'ticketType') {
//       setTicketPrice(ticketTypes[value]);
//     }
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const calculatedTotalPrice = ticketPrice * formData.quantity; // Ensure total price is calculated
 
//     try {
//       const response = await axios.post("http://localhost:3000/api/payments", {
//         event_id: 35, // Replace with actual event_id
//         attendee_id: 18, // Replace with actual attendee_id
//         ticket_type: formData.ticketType,  // Fix field name
//         quantity: formData.quantity,
//         price: ticketPrice,  // Fix field name
//         total_price: calculatedTotalPrice,  // Fix field name
//       });
 
//       if (response.status === 201) { // Correct success condition
//         navigate("/confirmation", {
//           state:{ ticketType: formData.ticketType,
//             quantity: formData.quantity,
//             ticketPrice: ticketPrice,
//             totalPrice: calculatedTotalPrice,
//             ticketDetails: ticketDetails, // Include detailed ticket info
//             },
//         });
//       }
//     } catch (error) {
//       console.error("Booking failed:", error);
//       alert("Booking failed. Please try again.");
//     }
 
//     // Reset form data after submission
//     setFormData({ ticketType: "general", quantity: 1 });
//     setTicketDetails([]);
//   };
 
//   const addTicketDetail = () => {
//     if (ticketDetails.length < formData.quantity) {
//       setTicketDetails([
//         ...ticketDetails,
//         {
//           name: '',
//           age: '',
//           email: '',
//           phone: '',
//           dob: '',
//         },
//       ]);
//     }
//   };
 
//   const handleDetailChange = (index, e) => {
//     const { name, value } = e.target;
//     const newTicketDetails = [...ticketDetails];
//     newTicketDetails[index][name] = value;
//     setTicketDetails(newTicketDetails);
//   };
 
//   const handleDelete = (index) => {
//     const newTicketDetails = ticketDetails.filter((_, i) => i !== index);
//     setTicketDetails(newTicketDetails);
//   };
 
//   const totalPrice = ticketPrice * formData.quantity;
 
//   return (
//     <div className="bg-[#D9EAFD] shadow-lg mt-50 container mx-auto px-4 py-8 flex flex-col gap-8">
//       <div className="flex gap-8">
//         <div className="w-1/2 pr-8">
//           <img
//             src=""
//             alt="Event"
//             className="w-full h-auto rounded-lg shadow-lg"
//           />
//         </div>
//         <div className="w-1/2">
//           <h2 className="text-3xl font-semibold mb-4">Music Concert 2025</h2>
//           <p className="text-lg mb-4">Join us for an unforgettable night of live music, featuring top artists from around the world.</p>
//           <div className="text-lg font-semibold mb-4">
//             <p><strong>Date:</strong> March 25, 2025</p>
//             <p><strong>Time:</strong> 7:00 PM</p>
//             <p><strong>Venue:</strong> Grand Concert Hall, City Center</p>
//           </div>
//         </div>
//       </div>
 
//       <form onSubmit={handleSubmit} className="bg-[#F1F3F8] p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold mb-4 text-center">Book Now</h3>
 
//         <div className="flex gap-8">
//           {Object.entries(ticketTypes).map(([key, price]) => (
//             <label
//               key={key}
//               className={`border-2 p-4 w-1/3 flex justify-center items-center rounded-lg cursor-pointer
//                   ${formData.ticketType === key ? 'bg-black text-white' : ''}`}
//             >
//               <input
//                 type="radio"
//                 name="ticketType"
//                 value={key}
//                 checked={formData.ticketType === key}
//                 onChange={handleChange}
//                 className="hidden"
//               />
//               <div className="flex flex-col items-center">
//                 <div className="text-xl font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
//                 <div className="text-lg">${price}</div>
//               </div>
//             </label>
//           ))}
//         </div>
 
//         <div className="mb-6">
//           <label className="block text-lg font-semibold text-gray-800 mb-2">Number of Tickets</label>
//           <div className="flex items-center gap-4">
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               min="1"
//               max="10"
//               className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md focus:outline-none transition duration-200 ease-in-out"
//               required
//             />
//             <button
//               type="button"
//               onClick={addTicketDetail}
//               className="p-2 bg-black shadow-lg text-white rounded-full flex justify-center items-center"
//               disabled={ticketDetails.length >= formData.quantity} // Disable the button if max is reached
//             >
//               +
//             </button>
//           </div>
//         </div>
 
//         {ticketDetails.map((detail, index) => (
//           <div key={index} className="mb-6">
//             <h4 className="text-lg font-semibold mb-4 flex items-center justify-between">
//               Ticket {index + 1} Details
//               <button
//                 type="button"
//                 onClick={() => handleDelete(index)}
//                 className="text-red-600 text-xl hover:text-red-800"
//               >
//                 &#128465; {/* Trash bin icon */}
//               </button>
//             </h4>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-lg font-semibold text-gray-800 mb-2">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={detail.name}
//                   onChange={(e) => handleDetailChange(index, e)}
//                   className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-semibold text-gray-800 mb-2">Age</label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={detail.age}
//                   onChange={(e) => handleDetailChange(index, e)}
//                   className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-semibold text-gray-800 mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={detail.email}
//                   onChange={(e) => handleDetailChange(index, e)}
//                   className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-semibold text-gray-800 mb-2">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={detail.phone}
//                   onChange={(e) => handleDetailChange(index, e)}
//                   className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-semibold text-gray-800 mb-2">Date of Birth</label>
//                 <input
//                   type="date"
//                   name="dob"
//                   value={detail.dob}
//                   onChange={(e) => handleDetailChange(index, e)}
//                   className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
 
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="flex flex-col justify-center items-center relative border border-white rounded-[2%] p-4 text-white bg-black overflow-hidden transition-colors duration-300 ease-in-out
//             before:absolute before:inset-0 before:right-0 before:bg-white before:w-0 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:text-black
//             before:z-0 z-10 hover:cursor-pointer hover:shadow-lg max-w-xs"
//           >
//             <span className="relative z-10 transition-colors duration-0 ease-in-out text-center">
//               Confirm Booking
//             </span>
//             <div className="relative z-10 text-center mt-2">
//               <span className="transition-colors duration-0 ease-in-out">
//                 Total Price: ${totalPrice}
//               </span>
//             </div>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
 
// export default TicketBooking;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TicketBooking = () => {
  const [formData, setFormData] = useState({
    ticketType: 'general',
    quantity: 1,
  });

  const [ticketPrice, setTicketPrice] = useState(50);
  const ticketTypes = {
    general: 50,
    vip: 100,
    earlybird: 40,
  };

  const [ticketDetails, setTicketDetails] = useState([]);
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

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

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const newTicketDetails = [...ticketDetails];

    if (name === 'dob') {
      const age = calculateAge(value);
      newTicketDetails[index][name] = value;
      newTicketDetails[index]['age'] = age;
    } else {
      newTicketDetails[index][name] = value;
    }

    setTicketDetails(newTicketDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedTotalPrice = ticketPrice * formData.quantity;

    // Navigate to the Confirmation page
    navigate("/confirmation", {
      state: {
        ticketType: formData.ticketType,
        quantity: formData.quantity,
        ticketPrice: ticketPrice,
        totalPrice: calculatedTotalPrice,
        ticketDetails: ticketDetails, // Include detailed ticket info
      },
    });

    // Reset form data after submission
    setFormData({ ticketType: "general", quantity: 1 });
    setTicketDetails([]);
  };

  const addTicketDetail = () => {
    if (ticketDetails.length < formData.quantity) {
      setTicketDetails([
        ...ticketDetails,
        {
          name: '',
          age: '',
          email: '',
          phone: '',
          dob: '',
        },
      ]);
    }
  };

  const handleDelete = (index) => {
    const newTicketDetails = ticketDetails.filter((_, i) => i !== index);
    setTicketDetails(newTicketDetails);
  };

  const totalPrice = ticketPrice * formData.quantity;

  return (
    <div className="bg-[#D9EAFD] shadow-lg mt-50 container mx-auto px-4 py-8 flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="w-1/2 pr-8">
          <img
            src=""
            alt="Event"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="w-1/2">
          <h2 className="text-3xl font-semibold mb-4">Music Concert 2025</h2>
          <p className="text-lg mb-4">Join us for an unforgettable night of live music, featuring top artists from around the world.</p>
          <div className="text-lg font-semibold mb-4">
            <p><strong>Date:</strong> March 25, 2025</p>
            <p><strong>Time:</strong> 7:00 PM</p>
            <p><strong>Venue:</strong> Grand Concert Hall, City Center</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#F1F3F8] p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-center">Book Now</h3>

        <div className="flex gap-8">
          {Object.entries(ticketTypes).map(([key, price]) => (
            <label
              key={key}
              className={`border-2 p-4 w-1/3 flex justify-center items-center rounded-lg cursor-pointer
                  ${formData.ticketType === key ? 'bg-black text-white' : ''}`}
            >
              <input
                type="radio"
                name="ticketType"
                value={key}
                checked={formData.ticketType === key}
                onChange={handleChange}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                <div className="text-lg">${price}</div>
              </div>
            </label>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-2">Number of Tickets</label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              max="10"
              className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md focus:outline-none transition duration-200 ease-in-out"
              required
            />
            <button
              type="button"
              onClick={addTicketDetail}
              className="p-2 bg-black shadow-lg text-white rounded-full flex justify-center items-center"
              disabled={ticketDetails.length >= formData.quantity} // Disable the button if max is reached
            >
              +
            </button>
          </div>
        </div>

        {ticketDetails.map((detail, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center justify-between">
              Ticket {index + 1} Details
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="text-red-600 text-xl hover:text-red-800"
              >
                &#128465; {/* Trash bin icon */}
              </button>
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={detail.name}
                  onChange={(e) => handleDetailChange(index, e)}
                  className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={detail.age}
                  readOnly
                  className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={detail.email}
                  onChange={(e) => handleDetailChange(index, e)}
                  className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={detail.phone}
                  onChange={(e) => handleDetailChange(index, e)}
                  className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={detail.dob}
                  onChange={(e) => handleDetailChange(index, e)}
                  className="w-full p-4 rounded-lg border-2 border-gray-300 shadow-md"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex flex-col justify-center items-center relative border border-white rounded-[2%] p-4 text-white bg-black overflow-hidden transition-colors duration-300 ease-in-out
            before:absolute before:inset-0 before:right-0 before:bg-white before:w-0 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:text-black
            before:z-0 z-10 hover:cursor-pointer hover:shadow-lg max-w-xs"
          >
            <span className="relative z-10 transition-colors duration-0 ease-in-out text-center">
              Confirm Booking
            </span>
            <div className="relative z-10 text-center mt-2">
              <span className="transition-colors duration-0 ease-in-out">
                Total Price: ${totalPrice}
              </span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketBooking;
