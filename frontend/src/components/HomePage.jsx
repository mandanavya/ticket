import React from "react";
import LandingPageForAttendee from "./LandingPageForAttendee";
import LandingPageForOrganizer from "./LandingPageForOrganizer";

function HomePage() {
  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.role) {
    return <h1>Please log in to access the platform.</h1>;
  }

  return user.role === "organizer" ? <LandingPageForOrganizer /> : <LandingPageForAttendee />;
}

export default HomePage;
