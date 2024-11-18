import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './Details.css'
import { useNavigate, useParams } from 'react-router-dom'; // To get the ID from the URL
import { IoMdArrowRoundBack } from "react-icons/io";

const Details = () => {
  const { id } = useParams(); // Get the ID from the URL parameter
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  // Memoize the fetchDetails function to prevent it from being recreated on every render
  const fetchDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/menu/${id}`);
      if (response.data.success) {
        setItem(response.data.data);
        console.log(response.data.data);
      } else {
        console.log("Error: Could not fetch item data.");
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  }, [id]); // Depend on `id`, so it will re-run when the ID changes

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]); // Re-run the effect only if `fetchDetails` changes

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-page">
      <div className='details-side-left'>
        <div onClick={() => navigate(`/list`)} ><IoMdArrowRoundBack size={60} color="blue" /></div>
        <h2>{item.name}</h2>
        <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
      </div>
      <div>
        <p><strong>Category:</strong> {item.category_1}<br/>{item.category_2}<br/>{item.category_3}</p>
      
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Contact:</strong> {item.contact}</p>
        <p><strong>Description:</strong> {item.description}</p>
      </div>
    </div>
  );
};

export default Details;
