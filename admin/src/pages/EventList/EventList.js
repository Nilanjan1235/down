import React, { useEffect, useState, useCallback } from 'react';
import './EventList.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EventList = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to another page

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/event/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (eventId) => {
    const response = await axios.post(`${url}/api/event/remove`, { id: eventId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  const approveFood = async (eventId) => {
    const response = await axios.post(`${url}/api/event/approve`, { id: eventId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  
  const rejectFood = async (eventId) => {
    const response = await axios.post(`${url}/api/event/reject`, { id: eventId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  const markOutdated = useCallback(async () => {
    try {
      const response = await axios.post(`${url}/api/event/mark-outdated`);
      if (response.data.success) {
        toast.success(response.data.message);
      } 
    } catch (error) {
      console.error("Error marking events as outdated:", error);
      toast.error("An error occurred while updating events");
    }
  }, [url]); 

  const handleItemClick = (eventid) => {
    navigate(`/Eventdetails/${eventid}`);  // Navigate to the details page with the item ID
  };

  useEffect(() => {
    fetchList();
    markOutdated()

  }, [markOutdated]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-default';
    }
};

  return (
    <div className='list add flex-col'>
      <h2>All Registered Event List</h2>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Location</b>
          <b>Contact</b>
          <b>Description</b>
          <b>Status</b>
    
        </div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className='list-table-format'
              onClick={() => handleItemClick(item._id)} // Click event to open details
            >
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.location}</p>
              <p>{item.contact}</p>
              <p className="description">{item.description}</p>

             
              <p className={`status ${getStatusClass(item.status)}`}>{item.status}</p>
              
              <div className='cur'>
                <p onClick={(e) => { e.stopPropagation(); approveFood(item._id); }} className='cursor'>$</p>
                <p onClick={(e) => { e.stopPropagation(); removeFood(item._id); }} className='cursor'>X</p>
                <p onClick={(e) => { e.stopPropagation(); rejectFood(item._id); }} className='cursor'> #</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventList;
