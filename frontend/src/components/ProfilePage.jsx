import React from "react";

const ProfilePage = () => {
  return (
    <div className="container mx-auto mt-16 p-6">
      <h2 className="text-3xl font-semibold mb-4">Your Profile</h2>
      <div className="flex gap-6">
        <div>
          <img
            src="https://www.example.com/path-to-your-avatar.jpg" // Replace with actual profile image
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">John Doe</h3>
          <p>Email: john.doe@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
