
// import React from "react";

// const MyOrdersPage = () => {
//   // Mock data for past events/bookings
//   const orders = [
//     {
//       eventId: 1,
//       eventName: "Rock Concert",
//       eventDate: "2025-03-01",
//       eventTime: "7:00 PM",
//       bookingRef: "RC12345",
//       tickets: 2,
//       eventImage: "https://via.placeholder.com/150", // Image of the event
//     },
//     {
//       eventId: 2,
//       eventName: "Stand-up Comedy Show",
//       eventDate: "2025-02-20",
//       eventTime: "9:00 PM",
//       bookingRef: "SC67890",
//       tickets: 1,
//       eventImage: "https://via.placeholder.com/150", // Image of the event
//     },
//     // Add more mock data as needed
//   ];

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-semibold text-center mb-8">My Orders</h2>

//       {/* Orders list */}
//       <div className="space-y-6">
//         {orders.length === 0 ? (
//           <p className="text-center text-gray-600">You have no past bookings.</p>
//         ) : (
//           orders.map((order) => (
//             <div
//               key={order.bookingRef}
//               className="flex border border-gray-300 p-4 rounded-lg shadow-lg items-center space-x-6 hover:scale-105 transform transition-all duration-300 ease-in-out"
//             >
//               {/* Event Image with hover effect */}
//               <img
//                 src={order.eventImage}
//                 alt={order.eventName}
//                 className="w-24 h-24 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
//               />
//               <div className="flex-1">
//                 <h3 className="text-xl font-semibold">{order.eventName}</h3>
//                 <p className="text-gray-600">{order.eventDate} | {order.eventTime}</p>
//                 <p className="text-gray-600">Tickets: {order.tickets}</p>
//                 <p className="text-gray-500">Booking Ref: {order.bookingRef}</p>
//               </div>
//               <div>
//                 {/* Buttons for each order (view details, re-book, etc.) */}
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-all hover:bg-blue-600">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrdersPage;


import React from "react";

const MyOrdersPage = () => {
  // Mock data for past events/bookings
  const orders = [
    {
      eventId: 1,
      eventName: "Rock Concert",
      eventDate: "2025-03-01",
      eventTime: "7:00 PM",
      bookingRef: "RC12345",
      tickets: 2,
      eventImage: "https://th.bing.com/th/id/OIP.XNLYxEfRtc0bd5jPmmDQLAHaEK?w=313&h=180&c=7&r=0&o=5&pid=1.7", // Image of the event
    },
    {
      eventId: 2,
      eventName: "Stand-up Comedy Show",
      eventDate: "2025-02-20",
      eventTime: "9:00 PM",
      bookingRef: "SC67890",
      tickets: 1,
      eventImage: "https://via.placeholder.com/150", // Image of the event
    },
    // Add more mock data as needed
  ];

  return (
    <div className="mt-30 flex flex-col items-center p-6 max-w-6xl mx-auto bg-[#D9EAFD]">
      <h2 className="text-3xl font-semibold text-center mb-8">My Orders</h2>

      {/* Orders list */}
      <div className="space-y-6 w-full">
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">You have no past bookings.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.bookingRef}
              className="flex border border-gray-300 p-4 rounded-lg shadow-lg items-center space-x-6 hover:scale-105 transform transition-all duration-300 ease-in-out bg-white"
            >
              {/* Event Image with hover effect */}
              <img
                src={order.eventImage}
                alt={order.eventName}
                className="w-24 h-24 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{order.eventName}</h3>
                <p className="text-gray-600">{order.eventDate} | {order.eventTime}</p>
                <p className="text-gray-600">Tickets: {order.tickets}</p>
                <p className="text-gray-500">Booking Ref: {order.bookingRef}</p>
              </div>
              <div>
                {/* Buttons for each order (view details, re-book, etc.) */}
                <button className="relative border border-white rounded-[2%] p-2 text-white bg-black overflow-hidden transition-colors duration-300 ease-in-out 
            before:absolute before:inset-0 before:right-0 before:bg-white before:w-0 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:text-black 
            before:z-0 z-10 hover:cursor-pointer hover:shadow-lg">
                  <span className="relative z-10 transition-colors duration-0 ease-in-out text-center">
              View Details
            </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
