import React, { useContext, useEffect, useState, useCallback } from 'react';
import './DisplayListing.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; //
 // Import Link

const DisplayListing = () => {
  const { url, userId } = useContext(StoreContext);
  const [menus, setMenus] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch menus for the user
  const fetchUserMenus = useCallback(async () => {
    if (!userId) {
      console.log("User not logged in");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/menu/usermenus`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMenus(response.data.data);
    } catch (err) {
      console.error('Error fetching menus:', err);
      setError('Failed to load menus');
    }
  }, [userId, token, url]);

  // Fetch events for the user
  const fetchUserEvents = useCallback(async () => {
    if (!userId) {
      console.log("User not logged in");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/event/userevents`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(response.data.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    }
  }, [userId, token, url]);

  useEffect(() => {
    if (token) {
      fetchUserEvents();
      fetchUserMenus();
    }
  }, [token, fetchUserEvents, fetchUserMenus]);

  const removeMenu = async (menuId) => {
    const response = await axios.post(`${url}/api/menu/remove`, { id: menuId });
    await fetchUserMenus();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const removeEvent = async (eventId) => {
    const response = await axios.post(`${url}/api/event/remove`, { id: eventId });
    await fetchUserEvents();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="my-orders">
      <h2>My Listing</h2>

      {/* Menus Section */}
      <div className="menus-section">
        <h3>Registered Services</h3>
        {menus.length > 0 ? (
          <div className="grid-container">
            {menus.map((menu, index) => (
              <div className="grid-item" key={index}>
                <div className="menu-card">
                  <button
                    className="delete-button"
                    onClick={() => removeMenu(menu._id)}
                  >
                    ❌
                  </button>

                  {/* Navigate to the details page when the menu item is clicked */}
                  <Link to={`/listmenu/${menu._id}`}>
                    <img src={url + "/images/" + menu.image} alt={menu.name} />
                    <h4>{menu.name}</h4>
                    <p>Category: {menu.category_1}</p>
                    <p>Location: {menu.location}</p>
                    <p>Description: {menu.description}</p>
                    <p>Status: {menu.status}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No menus available.</p>
        )}
      </div>

      {/* Events Section */}
      <div className="events-section">
        <h3>Registered Events</h3>
        {events.length > 0 ? (
          <div className="grid-container">
            {events.map((event, index) => (
              <div className="grid-item" key={index}>
                <div className="event-card">
                  <button
                    className="delete-button"
                    onClick={() => removeEvent(event._id)}
                  >
                    ❌
                  </button>

                  {/* Navigate to the details page when the event item is clicked */}
                  <Link to={`/listevent/${event._id}`}>
                    <img src={url + "/images/" + event.image} alt={event.name} />
                    <h4>{event.name}</h4>
                    <p>Location: {event.location}</p>
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Time: {event.time}</p>
                    <p>Price: ${event.price}</p>
                    <p>Status: {event.status}</p>
                    <p>Description: {event.description}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No events available.</p>
        )}
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default DisplayListing;
