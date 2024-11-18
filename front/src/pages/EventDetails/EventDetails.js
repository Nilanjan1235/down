import React ,{ useContext }from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { LuAlarmClock } from "react-icons/lu";
import { FaPhone } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

import { FaRupeeSign } from "react-icons/fa";
import './EventDetails.css';
import { StoreContext } from '../../Context/StoreContext'
import { FaRegCalendarAlt } from "react-icons/fa";

const EventDetails = () => {
  // Get the product ID from the URL params
  const { id } = useParams(); 
  const { event_list ,url} = useContext(StoreContext);// Get the id parameter from the URL

  // Find the product by its _id (compare the URL id to the _id in org array)
  const product = event_list.find(item => item._id === id); // We compare _id with the id from URL
  const navigate = useNavigate();
  

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <div onClick={()=>navigate(`/events`)} className='bfd' >
        <IoMdArrowRoundBack size={30} color='#3678f1ff'/>
        <h2>Events List</h2>
      </div>
      <div className="product-details-content">
        <div className="product-image">
          <img src={url+"/images/"+product.image} alt={product.name} />
          <div className="phone">
            <div className='func'>
              <FaPhone size={35}/>
            </div>
            <h5 className="phone-content" >{product.contact}</h5>
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <hr />
          <p className="product-category">{product.category}</p>

          <div className='grider'>
            <div className="location-m">
              <div className='func-1'>
                <IoLocationSharp size={20} />
              </div>
              <h5 className="location-j" >{product.location}</h5>
            </div>

            <div className="location-m">
              <div className='func-2'>
                <FaRegCalendarAlt size={20} color='orange' />
              </div>
              <h5 className="location-j" >{new Date(product.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</h5>
            </div>
            <div className="location-m">
              <div className='func-3'>
                <FaRupeeSign size={19} color='green' />
              </div>
              <h5 className="location-j" >{product.price}</h5>
            </div>

            <div className="location-m">
              <div className='func-2'>
                <LuAlarmClock size={20} color='blue' />
              </div>
              <h5 className="location-j" >{product.time}</h5>
            </div>
          </div>
          
          

          <p className="product-description">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

