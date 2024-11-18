import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [menu_list, setMenuList] = useState([]);
  const [event_list, setEventList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(null);

  // Effect to decode the token and set userId when token changes
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);  // Set userId from token
    }
  }, [token]);  // Now token is the dependency

  // Fetch food list from the server
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/menu/list");
      // Filter the menu items to include only those with "approved" status
      const approvedMenuItems = response.data.data.filter(item => item.status === "approved");
      setMenuList(approvedMenuItems);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Fetch event list from the server
  const fetchEventList = async () => {
    try {
      const response = await axios.get(url + "/api/event/list");
      // Filter the event items to include only those with "approved" status
      const approvedEventItems = response.data.data.filter(event => event.status === "approved");
      setEventList(approvedEventItems);
    } catch (error) {
      console.error("Error fetching event list:", error);
    }
  };

  // Effect to load data when the component mounts
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      await fetchEventList();
      const tokenFromStorage = localStorage.getItem("token");
      if (tokenFromStorage) {
        setToken(tokenFromStorage);
      }
    }
    loadData();
  }, []);  // Empty dependency array ensures it runs once after mount

  const contextValue = {
    menu_list,
    event_list,
    url,
    token,
    setToken,
    userId,
    setUserId
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
