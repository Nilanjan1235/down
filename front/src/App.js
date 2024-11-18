
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Menu from './pages/Menu/Menu'
import AddItem from './pages/AddItem/AddItem'
import DisplayListing from './pages/DisplayListing/DisplayListing'
import Details from './pages/Details/Details'
import Best from './pages/Best/Best'
import Events from './pages/Events/Events'
import AddEevnt from './pages/AddEevnt/AddEevnt'
import EventDetails from './pages/EventDetails/EventDetails'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import Pop from './components/Pop/Pop'
import ListMenu from './pages/ListMenu/ListMenu'
import ListEvent from './pages/ListEvent/ListEvent'








const App = () => {

  const[showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<Pop setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>

        <ToastContainer/>
       
        <Navbar setShowLogin={setShowLogin} />
        
        <Routes>
          < Route path='/' element={<Home />} />
          < Route path='/menu' element={<Menu />} /> 
          < Route path='/events' element={<Events />} />
          < Route path='/listing/add' element={<AddItem />} />
          < Route path='/listing/display' element={<DisplayListing /> } />
          < Route path='/listing/addevent' element={<AddEevnt />}/>
          < Route path='/menu/details/:id' element={<Details/>} />
          < Route path='/menu/best' element={<Best/>}/>  
          < Route path='/events/eventdetails/:id' element={<EventDetails/>}/>
          < Route path='/listmenu/:id' element={<ListMenu/>} />
          < Route path='/listevent/:id' element={<ListEvent/>} />
          

        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App