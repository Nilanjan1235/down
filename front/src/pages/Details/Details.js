import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { FaPhone } from "react-icons/fa6";
import './Details.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { StoreContext } from '../../Context/StoreContext'



const Details = () => {
  // Get the product ID from the URL params
  const { id } = useParams(); // Get the id parameter from the URL
  const navigate = useNavigate();
  const { menu_list, url } = useContext(StoreContext);


  // Find the product by its _id (compare the URL id to the _id in org array)
  const product = menu_list.find(item => item._id === id); // We compare _id with the id from URL

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <div onClick={() => navigate(`/menu`)} className='bfd'>
        <IoMdArrowRoundBack size={30} color='#3678f1ff' />
        <h2>Organizers List </h2>
      </div>
      <div className="product-details-content">
        <div className="product-image">
          <img src={url + "/images/" + product.image} alt={product.name} />
          <div className="phone">
            <div className='func'>
              <FaPhone size={35} />
            </div>
            <h5 className="phone-content" >{product.contact}</h5>
          </div>

        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <hr />
          <div className='categ-1'>
            <p>{product.category_1}</p>
            <p>{product.category_2}</p>
            <p>{product.category_3}</p>
          </div>
          <div className="location-m">
            <div className='func-1'>
              <IoLocationSharp size={20} />
            </div>
            <h5 className="location-j" >{product.location}</h5>
          </div>

          <p className="product-description">{product.description}</p>
        </div>
      </div>
    </div>


  );
};



export default Details;
