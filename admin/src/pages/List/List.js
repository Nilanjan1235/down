
import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to another page

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/menu/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (menuId) => {
    const response = await axios.post(`${url}/api/menu/remove`, { id: menuId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  const approveFood = async (menuId) => {
    const response = await axios.post(`${url}/api/menu/approve`, { id: menuId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  const rejectFood = async (menuId) => {
    const response = await axios.post(`${url}/api/menu/reject`, { id: menuId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  




  const handleItemClick = (menuid) => {
    navigate(`/details/${menuid}`);  // Navigate to the details page with the item ID
  };

  useEffect(() => {
    fetchList();
  }, []);

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
      <h2>All Registered Organizers list</h2>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
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
              <p>{item.location}</p>
              <p>{item.contact}</p>
              <p className="description">{item.description}</p>
              <p className={`status ${getStatusClass(item.status)}`}>{item.status}</p>
              <div className='cur'>
                <p onClick={(e) => { e.stopPropagation(); approveFood(item._id); }} className='cursor'> $</p>
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

export default List;
