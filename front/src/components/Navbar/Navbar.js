import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { PiListPlusBold } from "react-icons/pi";
import { MdMessage } from "react-icons/md";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { StoreContext } from '../../Context/StoreContext';
import { FaUserCircle } from "react-icons/fa";


const Navbar = ({setShowLogin}) => {

    const savedMenu = localStorage.getItem('activeMenu') || 'home';

    // Initialize state with the saved menu value
    const [menu, setMenu] = useState(savedMenu);
    const {token,setToken} = useContext(StoreContext)
    const navigate = useNavigate();

    // Whenever the menu state changes, save it to localStorage
    useEffect(() => {
        localStorage.setItem('activeMenu', menu);
    }, [menu]);

    // Handle navigating to the add page and close the dropdown
    const handleAddClick = () => {
        
        setMenu('home'); // Close the dropdown when 'Add' is clicked
        navigate('/listing/add');
    };
    const logout = () =>{

        localStorage.removeItem("token");
        setToken("");
        navigate("/")



    }

    // Handle navigating to the display page and close the dropdown
    const handleDisplayClick = () => {
        setMenu('home'); // Close the dropdown when 'Display' is clicked
        navigate('/listing/display');
    };
    const handleEventClick = () => {
        setMenu('home'); // Close the dropdown when 'Display' is clicked
        navigate('/listing/addevent');
    };
    const triggerLogin = () => {
        setShowLogin(true);
        setMenu('home')
    };


    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt='' className='logo' /></Link>
            <ul className='navbar-menu'>

                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""} >
                    <IoMdHome size={25} />
                    <p>Home</p>
                </Link>

                <Link to='/menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""} >
                    <FaClipboardList size={19} />
                    <p>Organizers</p>
                </Link>
                <Link to='/events' onClick={() => setMenu("events")} className={menu === "events" ? "active" : ""} >
                    <MdMessage size={21} />
                    <p>Events</p>
                </Link>

                <div className={menu === "listing" ? "active navbar-profile" : "navbar-profile"}>
                    <PiListPlusBold size={22} />
                    <p onClick={() => setMenu("listing")}>Listing</p>
                    <ul className={menu === "listing" ? 'nav-profile-dropdown open' : 'nav-profile-dropdown'}>
                        <li onClick={token ? handleEventClick : triggerLogin}>
                            <MdLibraryAdd size={20} color='green' />
                            <p>List Your Event</p>
                        </li>
                        <hr />
                        <li onClick={token ? handleDisplayClick : triggerLogin}>
                            <FaTableList size={15} color='orange' />
                            <p>Listed Events</p>
                        </li>
                        <hr />
                        <li onClick={token ? handleAddClick : triggerLogin}>
                            <MdOutlineAddBusiness size={30} color='red' />
                            <p>Register Your Company</p>
                        </li>
                    </ul>
                </div>

            </ul>
            <div className='navbar-right'>
                    {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> :
                        <div className="navbar-profile">
                            <FaUserCircle size={28}color='white' />
                            <ul className='nav-profile-dropdown'>
                                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                            </ul>
                        </div>

                    }
                </div>

            </div>
        
    );
};

export default Navbar;