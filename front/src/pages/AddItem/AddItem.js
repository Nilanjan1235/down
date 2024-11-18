import React, { useState } from 'react'
import './AddItem.css'
import { assets1} from '../../assets/front/assets1'
import axios from 'axios'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode';

const AddItem = () => {
    const [item, setItem] = useState({
        userId:'',
        name: '',
        category_1: '',
        category_2: '',
        category_3: '',
        location: '',
        description: '',
        contact:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };
    const url = "http://localhost:4000";

    const [image, setImage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

    if (!token) {
        toast.error('You must be logged in to add an event!');
        return;
    }

    // Extract the userId from the token (JWT decoding)
    const decodedToken = jwtDecode(token); // Decode the JWT token
    const userId = decodedToken?.id;

    if (!userId) {
        toast.error('Invalid token. Please log in again.');
        return;
    }

        // You would handle saving to the database here
        const formData = new FormData();

        formData.append("userId", userId);
        formData.append("name",item.name)
        formData.append("description",item.description)
        formData.append("contact",Number(item.contact))
        formData.append("category_1",item.category_1)
        formData.append("category_2",item.category_2)
        formData.append("category_3",item.category_3)
        formData.append("location",item.location)
        formData.append("image",image)
        const response = await axios.post(`${url}/api/menu/add`, formData, {
            headers: { 'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`

             } // Important for file uploads
        });
        if (response.data.success){
            setItem({
                userId:'',
                name: '',
                category_1: '',
                category_2: '',
                category_3: '',
                location: '',
                description: '',
                contact:'',
                
        
            })
            setImage(false)
            toast.success("Application Submitted")
            
        }
        else {
            toast.error(response.data.message)
    
        }

    };
    


    return (
        
        <div className="add-item-page">
            <h2>Submit This Application 
            to register 
            your <br/>Event Management service</h2>
           
                
            <form onSubmit={handleSubmit}>
                <div className='add-img-upload'>
                    <p>upload image</p>                    
                        <label htmlFor="image">
                            <img src={image ? URL.createObjectURL(image) : assets1.upload_area} alt="" />
                        </label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            hidden required
                        />    
                </div>

                <div className='add-name'>
                    <p>Name Of Your Company</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Comapny Name"
                        value={item.name}
                        onChange={handleChange}
                    />
                </div >
                <div className='add-category'>
                    <p>Choose Event</p>
                    <select onChange={handleChange} name="category_1">
                        <option value="Wedding ceremonies and receptions">Wedding ceremonies and receptions</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Corporate">Pre-wedding events</option>
                        <option value="Product launches">Product launches</option>
                        <option value="Music festivals">Music festivals</option>
                        <option value="Concerts and live performances">Concerts and live performances</option>
                        <option value="DJ nights">DJ nights</option>
                        <option value="Fundraising concerts">Fundraising concerts</option>
                        <option value="walks or runs">walks or runs</option>
                        <option value="Volunteer events">Volunteer events</option>
                        <option value="Auctions">Auctions</option>
                        <option value="Film festivals">Cultural festivals</option>
                        <option value="Professional training sessions">Professional training sessions</option>
                        <option value="Workshops and seminars">Workshops and seminars</option>
                        <option value="Webinars and virtual conferences">Webinars and virtual conferences</option>
                        <option value="Marathons">Marathons</option>
                        <option value="Sporting tournaments">Sporting tournaments</option>
                        <option value="Amateur sporting events">Amateur sporting events</option>
                        <option value="Charity sports events">Charity sports events</option>
                        <option value="Exhibitions">Exhibitions</option>
                        <option value="Anniversaries">Anniversaries</option>
                        <option value="Arts and crafts festivals">Food festivals</option>
                        <option value="Public speeches and town halls">Public speeches and town halls</option>
                        <option value="Media events">Media events</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Special events with fine dining experiences">Special events with fine dining experiences</option>
                        <option value="Film festivals">Film festivals</option>
                        <option value="Open Mic Comedy">Open Mic Comedy</option>

                    </select>
                    <select onChange={handleChange} name="category_2">
                        <option value="Wedding ceremonies and receptions">Wedding ceremonies and receptions</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Corporate">Pre-wedding events</option>
                        <option value="Product launches">Product launches</option>
                        <option value="Music festivals">Music festivals</option>
                        <option value="Concerts and live performances">Concerts and live performances</option>
                        <option value="DJ nights">DJ nights</option>
                        <option value="Fundraising concerts">Fundraising concerts</option>
                        <option value="walks or runs">walks or runs</option>
                        <option value="Volunteer events">Volunteer events</option>
                        <option value="Auctions">Auctions</option>
                        <option value="Film festivals">Cultural festivals</option>
                        <option value="Professional training sessions">Professional training sessions</option>
                        <option value="Workshops and seminars">Workshops and seminars</option>
                        <option value="Webinars and virtual conferences">Webinars and virtual conferences</option>
                        <option value="Marathons">Marathons</option>
                        <option value="Sporting tournaments">Sporting tournaments</option>
                        <option value="Amateur sporting events">Amateur sporting events</option>
                        <option value="Charity sports events">Charity sports events</option>
                        <option value="Exhibitions">Exhibitions</option>
                        <option value="Anniversaries">Anniversaries</option>
                        <option value="Arts and crafts festivals">Food festivals</option>
                        <option value="Public speeches and town halls">Public speeches and town halls</option>
                        <option value="Media events">Media events</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Special events with fine dining experiences">Special events with fine dining experiences</option>
                        <option value="Film festivals">Film festivals</option>
                        <option value="Open Mic Comedy">Open Mic Comedy</option>

                    </select>
                    <select onChange={handleChange} name="category_3">
                        <option value="Wedding ceremonies and receptions">Wedding ceremonies and receptions</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Corporate">Pre-wedding events</option>
                        <option value="Product launches">Product launches</option>
                        <option value="Music festivals">Music festivals</option>
                        <option value="Concerts and live performances">Concerts and live performances</option>
                        <option value="DJ nights">DJ nights</option>
                        <option value="Fundraising concerts">Fundraising concerts</option>
                        <option value="walks or runs">walks or runs</option>
                        <option value="Volunteer events">Volunteer events</option>
                        <option value="Auctions">Auctions</option>
                        <option value="Film festivals">Cultural festivals</option>
                        <option value="Professional training sessions">Professional training sessions</option>
                        <option value="Workshops and seminars">Workshops and seminars</option>
                        <option value="Webinars and virtual conferences">Webinars and virtual conferences</option>
                        <option value="Marathons">Marathons</option>
                        <option value="Sporting tournaments">Sporting tournaments</option>
                        <option value="Amateur sporting events">Amateur sporting events</option>
                        <option value="Charity sports events">Charity sports events</option>
                        <option value="Exhibitions">Exhibitions</option>
                        <option value="Anniversaries">Anniversaries</option>
                        <option value="Arts and crafts festivals">Food festivals</option>
                        <option value="Public speeches and town halls">Public speeches and town halls</option>
                        <option value="Media events">Media events</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Special events with fine dining experiences">Special events with fine dining experiences</option>
                        <option value="Film festivals">Film festivals</option>
                        <option value="Open Mic Comedy">Open Mic Comedy</option>

                    </select>
                </div>
                <div className='add-location'>
                    <p>Write Your Service Location</p>
                    <input
                        type="text"
                        name="location"
                        placeholder="Service Location"
                        value={item.location}
                        onChange={handleChange}
                    />
                </div>
                <div className='add-phone'>
                    <p>Phone Number</p>
                    <input
                        type="number"
                        name="contact"
                        placeholder="Phone Number"
                        value={item.contact}
                        onChange={handleChange}
                    />
                </div>
                <div className='add-desc'>
                    <p>Describe Your Services & Prices</p>
                    <textarea
                        name="description"
                        placeholder="Describe your services and prices"
                        rows={8}
                        value={item.description}
                        onChange={handleChange}
                    />
                </div>


                <button className='bty' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddItem;