import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Details from './pages/Details/Details'
import EventList from './pages/EventList/EventList'
import EventDetails from './pages/EventDetails/EventDetails'



const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path='/list' element={<List/>}/>
          <Route path='/details/:id' element={<Details/>}/>
          <Route path='/eventlist' element={<EventList/>}/>
          <Route path='/eventdetails/:id' element={<EventDetails/>}/>
          

        </Routes>
      </div>
      
    </div>
  )
}

export default App
