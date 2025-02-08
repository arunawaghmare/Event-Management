import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import api from "../utils/api";
const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    fetchEvents();
    fetchNotifications();
  }, []);

  const fetchEvents = () => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  };

  const fetchNotifications = () => {
    axios
      .get("http://localhost:5000/api/notifications")
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error(error));
  };

  const handleSearch = () => {
    const params = {};
    if (searchQuery) params.name = searchQuery;
    if (searchDate) params.date = searchDate;

    axios
      .get("http://localhost:5000/api/events/search", { params })
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/events/${id}`)
      .then(() => fetchEvents())
      .catch((error) => console.error(error));
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Events</h1>
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {event.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <div className="flex gap-4">
                <Link to={`/event/${event._id}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                    View Event
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
