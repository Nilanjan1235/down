import React, { useState,useContext } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import './Events.css';
import { useNavigate } from 'react-router-dom';
import { LuAlarmClock } from "react-icons/lu";
import { FaRupeeSign } from "react-icons/fa";
import { StoreContext } from '../../Context/StoreContext'
import { FaRegCalendarAlt } from "react-icons/fa";




const Events = () => {
  // Set the number of items per page

  const { event_list,url } = useContext(StoreContext);
  const itemsPerPage = 20;

  // Get the total number of pages
  const totalPages = Math.ceil(event_list.length / itemsPerPage);

  // State for the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Get the current items based on the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = event_list.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  return (
    <div className="main-container">
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>choose from our menu</p>
      <hr />


      <div className="org-container">
        {currentItems.map((item) => (
          <div onClick={()=>navigate(`/events/eventdetails/${item._id}`)} className="content-1" key={item.id}> {/* Assuming each item has a unique 'id' */}
            <img src={url+"/images/"+item.image} alt={item.name} className="org-image" />
            <div className="content-gap">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <div className='grider'>
                <div className="location">
                  <p><IoLocationSharp color='red' /></p>
                  <h5>{item.location}</h5>
                </div>
                <div className="location">
                  <p><FaRegCalendarAlt color='orange' size={15} /></p>
                  <h5>{new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</h5>
                </div>
                <div className="location">
                  <p><FaRupeeSign color='green' size={15} /></p>
                  <h5>{item.price}</h5>
                </div>
                <div className="location">
                  <p><LuAlarmClock color='blue' size={15} /></p>
                  <h5>{item.time}</h5>
                </div>
              </div>
            </div>
            <div className="buttons-1">
              <button onClick={()=>navigate(`/events/eventdetails/${item._id}`)} className="bts">More Details</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </button>

        {/* Page Number Buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Events;
