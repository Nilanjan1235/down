import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useParams, useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { FaPhone } from "react-icons/fa6";
import './ListEvent.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';  // Assuming you might want to fetch data from an API

const ListEvent = () => {
  const { id } = useParams(); // Get the menu ID from URL params
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);
  
  // State for product details and loading/error handling
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the product details from the API when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/event/${id}`);
        setProduct(response.data.data); 
        // Assuming the API response has a 'data' field
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, url]); // Re-run when `id` or `url` changes

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // If product not found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <div onClick={() => navigate('/listing/display')} className='bfd'>
        <IoMdArrowRoundBack size={30} color='#3678f1ff' />
        <h2>Listed Events</h2>
      </div>

      <div className="product-details-content">
        <div className="product-image">
          <img src={`${url}/images/${product.image}`} alt={product.name} />
          
          <div className="phone">
            <div className='func'>
              <FaPhone size={35} />
            </div>
            <h5 className="phone-content">{product.contact}</h5>
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <hr />
          <div className='categ-1'>
            <p>{product.category}</p>
        
          </div>

          <div className="location-m">
            <div className='func-1'>
              <IoLocationSharp size={20} />
            </div>
            <h5 className="location-j">{product.location}</h5>
          </div>

          <p className="product-description">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ListEvent;