import React, { useContext, useState } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext'




const Menu = () => {

  const { menu_list, url } = useContext(StoreContext);
  // Set the number of items per page
  // Function to change the current page
  const itemsPerPage = 20;

  // Get the total number of pages
  const totalPages = Math.ceil(menu_list.length / itemsPerPage);

  // State for the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Get the current items based on the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menu_list.slice(indexOfFirstItem, indexOfLastItem);


  // Function to change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  return (
    
      <div className="main-container">
        <h1>Top Organizers From Your City</h1>
        <p className='explore-menu-text'>From Sports Tournament To Wedding, Find Organizers For Any Type Of Event</p>
        <hr/>
        

        <div className="org-container">
          {currentItems.map((item) => (
            <div onClick={() => navigate(`/menu/details/${item._id}`)} className="content" key={item.id}> {/* Assuming each item has a unique 'id' */}
              <img src={url + "/images/" + item.image} alt="" className="org-image" />
              <div className="content-gap">
                <h3>{item.name}</h3>
                <div className='categ'>
                  <p>{item.category_1}</p>
                </div>
                <div className="location">
                  <p><IoLocationSharp color='red' /></p>
                  <h5>{item.location}</h5>
                </div>
                <p className="content-gap-para">{item.description}</p>
              </div>
              <div className="buttons">

                <button onClick={() => navigate(`/menu/details/${item._id}`)} className="btn">More Details</button>
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

export default Menu;