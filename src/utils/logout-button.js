import React from 'react';
import { Link } from 'react-router-dom'

const LogoutButton = () => (
  <Link to="/logout">
    <button className="py-2 px-4 rounded bg-white text-teal-dark font-semibold hover:underline">
      Logout
    </button>
  </Link>
);

export default LogoutButton;