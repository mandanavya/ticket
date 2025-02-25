import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { event, ticketType, quantity, ticketPrice, totalPrice } = location.state || {};

  return (
    <div className="bg-[#F1F3F8] min-h-screen flex justify-center items-center py-12">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl">
        <div className="bg-black text-white text-center py-4 rounded-t-lg">
          <h1 className="text-3xl font-semibold">Booking Confirmed!</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8 p-8">
          <div className="w-full md:w-1/3">
            <img
              src={event?.event_image || ""}
              alt={event?.event_name || "Event"}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold text-black mb-4">{event?.event_name || "Event Name"}</h2>
            <div className="text-lg font-semibold text-black">
              <p><strong>Date:</strong> {event?.date ? new Date(event.date).toLocaleDateString() : "TBA"}</p>
              <p><strong>Time:</strong> {event?.time || "TBA"}</p>
              <p><strong>Venue:</strong> {event?.location || "TBA"}</p>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-[#F9FAFB] p-8">
          <h3 className="text-xl font-semibold text-black mb-4">Booking Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-black mb-2 text-center">Ticket Information</h4>
              <div className="mb-4"><strong>Ticket Type:</strong> {ticketType}</div>
              <div className="mb-4"><strong>Quantity:</strong> {quantity}</div>
              <div className="mb-4"><strong>Price:</strong> ${ticketPrice} per ticket</div>
              <div className="mb-4"><strong>Total Price:</strong> ${totalPrice}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 rounded-b-lg">
          <button
            className="relative border border-white rounded-[2%] p-2 text-white bg-black overflow-hidden transition-colors duration-300 ease-in-out
            before:absolute before:inset-0 before:right-0 before:bg-white before:w-0 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:text-black
            before:z-0 z-10 hover:cursor-pointer hover:shadow-lg"
            onClick={() => window.location.reload()}
          >
            <span className="relative z-10 transition-colors duration-0 ease-in-out">
              OK
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
