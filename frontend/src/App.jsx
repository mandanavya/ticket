import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import EventRegistrationForm from './components/EventRegistrationForm'; // Adjust path if needed
import TicketBooking from './components/TicketBooking'; // Adjust path if needed
import Navbar from './components/Navbar';
import ConfirmationPage from './components/ConfirmationPage';
import ProfilePage from './components/ProfilePage';
import MyOrdersPage from './components/MyOrdersPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import EventForm from './components/EventForm';
import HomePage from './components/HomePage';
import EventDetails from './components/EventDetails';
import OrganizerDashboard from './components/OrganizerDashboard';


const App = () => {
  
  return (
    <Router>
      <NavbarWithLocation />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<OrganizerDashboard />} />
        <Route path='/create-event' element={<EventForm />} />
        <Route path="/eventregistration" element={<EventRegistrationForm />} />
        <Route path="/ticket-booking" element={<TicketBooking />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/events" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetails />} />




        
      </Routes>
    </Router>
  );
};

const NavbarWithLocation = () => {
  const location = useLocation();
  
  // Hide Navbar for these routes
  const hideNavbarRoutes = ["/signup", "/login"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return shouldShowNavbar ? <Navbar /> : null;
};

export default App;


