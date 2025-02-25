
// import React, { useState } from "react";

// const Feedback = () => {
//   const [feedback, setFeedback] = useState({
//     name: "",
//     email: "",
//     rating: 5,
//     performance: "",
//     venue: "",
//     favoritePart: "",
//     improvements: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/feedback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(feedback),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert(data.message); // Success message
//       } else {
//         alert("Error submitting feedback. Please try again.");
//       }

//       // Clear the form
//       setFeedback({
//         name: "",
//         email: "",
//         rating: 5,
//         performance: "",
//         venue: "",
//         favoritePart: "",
//         improvements: "",
//       });

//     } catch (error) {
//       console.error("❌ Error:", error);
//       alert("Error submitting feedback. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto my-10 p-6 shadow-lg rounded-xl bg-[#D9EAFD]">
//       <h2 className="text-3xl font-semibold text-center mb-6">
//         “Music is the strongest form of magic.” 🎵✨
//       </h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
//         <label className="text-lg font-medium">Your Name:</label>
//         <input
//           type="text"
//           placeholder="Enter your name"
//           className="p-2 rounded-md border"
//           value={feedback.name}
//           onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
//           required
//         />

      
//         <label className="text-lg font-medium">Your Email:</label>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="p-2 rounded-md border"
//           value={feedback.email}
//           onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
//           required
//         />

//         <label className="text-lg font-medium">Rate Your Experience:</label>
//         <input
//           type="range"
//           min="1"
//           max="10"
//           value={feedback.rating}
//           onChange={(e) =>
//             setFeedback({ ...feedback, rating: e.target.value })
//           }
//           className="w-full cursor-pointer"
//         />
//         <p className="text-center font-semibold">{feedback.rating} / 10 ⭐</p>

//         <label className="text-lg font-medium">How was the performance?</label>
//         <div className="flex gap-4">
//         {["Excellent 🎤", "Good 🎶", "Average 😐", "Poor 😞"].map((option) => (
//             <label key={option} className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="performance"
//                 value={option}
//                 checked={feedback.performance === option}
//                 onChange={(e) =>
//                   setFeedback({ ...feedback, performance: e.target.value })
//                 }
//                 className="cursor-pointer"
//               />
//               {option}
//             </label>
//           ))}
//         </div>

//         <label className="text-lg font-medium">How was the venue?</label>
//         <div className="flex gap-4">
//          {["Excellent 🏟️", "Good 😊", "Average 🤔", "Poor 😞"].map((option) => (
//             <label key={option} className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="venue"
//                 value={option}
//                 checked={feedback.venue === option}
//                 onChange={(e) =>
//                   setFeedback({ ...feedback, venue: e.target.value })
//                 }
//                 className="cursor-pointer"
//               />
//               {option}
//             </label>
//           ))}
//         </div>

//         <label className="text-lg font-medium">
//           What was your favorite part of the concert?
//         </label>
//         <textarea
//           placeholder="Describe your favorite moment!"
//           className="p-2 rounded-md border h-20"
//           value={feedback.favoritePart}
//           onChange={(e) =>
//             setFeedback({ ...feedback, favoritePart: e.target.value })
//           }
//         />

//         <label className="text-lg font-medium">
//           Any suggestions for improvement?
//         </label>
//         <textarea
//           placeholder="Share your thoughts!"
//           className="p-2 rounded-md border h-20"
//           value={feedback.improvements}
//           onChange={(e) =>
//             setFeedback({ ...feedback, improvements: e.target.value })
//           }
//         />

//         <button
//           type="submit"
//           className="bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
//         >
//           Submit Feedback ✨
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Feedback;


import React, { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    event_id: 1, // This should be dynamically set based on the event
    attendee_id: "", // Email or name of the attendee
    rating: 0, // This will store the rating value
    performance: "",
    feedback_text: "",
  });

  // Handle rating selection
  const handleRatingClick = (rating) => {
    setFeedback((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: feedback.event_id,
          attendee_id: feedback.email, 
          rating: feedback.rating,
          performance: feedback.performance,
          feedback_text: feedback.feedback_text,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Success message
      } else {
        alert("Error submitting feedback. Please try again.");
      }

      // Clear the form
      setFeedback({
        name: "",
        email: "",
        event_id: 1,
        attendee_id: "",
        rating: 0,
        performance: "",
        feedback_text: "",
      });

    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div className="mt-50 max-w-2xl mx-auto my-10 p-6 shadow-lg rounded-xl bg-[#D9EAFD]">
      <h2 className="text-3xl font-semibold text-center mb-6">
        “Music is the strongest form of magic.” 🎵✨
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-lg font-medium">Your Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="p-2 rounded-md border"
          value={feedback.name}
          onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
          required
        />

        <label className="text-lg font-medium">Your Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded-md border"
          value={feedback.email}
          onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
          required
        />

        <label className="text-lg font-medium">Rate Your Experience:</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${star <= feedback.rating ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => handleRatingClick(star)}
              onMouseEnter={(e) => e.target.classList.add("text-yellow-500")}
              onMouseLeave={(e) => e.target.classList.remove("text-yellow-500")}
            >
              ★
            </span>
          ))}
        </div>

        <p className="text-center font-semibold">{feedback.rating} / 5 ⭐</p>

        <label className="text-lg font-medium">How was the performance?</label>
        <div className="flex gap-4">
          {["Excellent 🎤", "Good 🎶", "Average 😐", "Poor 😞"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="performance"
                value={option}
                checked={feedback.performance === option}
                onChange={(e) =>
                  setFeedback({ ...feedback, performance: e.target.value })
                }
                className="cursor-pointer"
              />
              {option}
            </label>
          ))}
        </div>

        <label className="text-lg font-medium">Your Feedback:</label>
        <textarea
          placeholder="Share your thoughts!"
          className="p-2 rounded-md border h-20"
          value={feedback.feedback_text}
          onChange={(e) => setFeedback({ ...feedback, feedback_text: e.target.value })}
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
        >
          Submit Feedback ✨
        </button>
      </form>
    </div>
  );
};

export default Feedback;
