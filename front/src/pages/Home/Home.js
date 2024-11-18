import React, { useContext } from 'react'
import './Home.css'
import { assets } from '../../assets/assets'
import { FaUserGroup } from "react-icons/fa6";
import { BsBuildingAdd } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FaPersonHiking } from "react-icons/fa6";
import { StoreContext } from '../../Context/StoreContext'
import { IoLocationSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';





const Home = () => {
  const { menu_list, url , event_list } = useContext(StoreContext); // Access menu_list from StoreContext
  const navigate = useNavigate();

  // Get the first 4 items from the menu list
  const menuItems = menu_list.slice(0, 4);
  const eventItems = event_list.slice(0, 4);


  return (
    <div className='carousel'>
      <div className='imgs'>
        <img src={assets.five} alt="" />
        <div className='flexi'>
          <div className='flexi-con-1'>        
            <p><FaUserGroup size={150} color='white'/></p>
            <div classname="detail">
              <h1>Find Organizers</h1><hr/><h3 >Browse From Our Wide Variety Of Event Organizers Available To Organize Any Kind Of Event</h3>
            </div>
          </div>
          <div className='flexi-con-2'>
            <p><FaPersonHiking size={150} color='#ff5a40'/></p>
            <div className='detail'>
              <h1>Find Events</h1><hr /><h3 >Browse From Wide Variety Of Events Organized By Other People In Your City For You To Attend Or Participate Like Anything From Cricket Match To Theatre </h3>
          </div>
          </div>
          <div className='flexi-con-3'>
            <p><MdOutlineAddPhotoAlternate size={150} color='#ffed4f'/></p>
            <div className='detail'>
              <h1>Post Events</h1><hr /><h3>Post Any Event From Football Match to Art Exhibiton And Invite Other People to Attend or Participate </h3>
            </div>
          </div>
          <div className='flexi-con-4'>
            <p><BsBuildingAdd size={150} color='#333'/></p>
            <div className='detail'>
              <h1>Register Service</h1><hr /><h3>Register Your Event Management Services With Us For Free And Get Discovered </h3>
            </div>
          </div>
        </div>
        <div className="menu-preview">
          <h2>Featured Organizers List</h2>
          <div className="menu-items">
            {menuItems.map((item) => (
              <div key={item.id} onClick={() => navigate(`/menu`)} className="menu-item">
                <img src={url + "/images/" + item.image} alt={item.name} className="menu-item-image" />
                <div className="menu-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <div className="menu-item-location">
                    <IoLocationSharp color='red' />
                    <span>{item.location}</span>
                  </div>
                  {/* <button onClick={() => navigate(`/menu/details/${item._id}`)} className="btn">More Details</button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="menu-preview">
          <h2>Featured Event List</h2>
          <div className="menu-items">
            {eventItems.map((item) => (
              <div key={item.id} onClick={() => navigate(`/events`)} className="menu-item">
                <img src={url + "/images/" + item.image} alt={item.name} className="menu-item-image" />
                <div className="menu-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.category_1}</p>
                  <div className="menu-item-location">
                    <IoLocationSharp color='red' />
                    <span>{item.location}</span>
                  </div>
                  {/* <button onClick={() => navigate(`/menu/details/${item._id}`)} className="btn">More Details</button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
     
      </div>
   

  )
}

export default Home

