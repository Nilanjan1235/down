import React, {  useState } from 'react';
import './AddEevnt.css';
import { assets1 } from '../../assets/front/assets1';
import axios from 'axios'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode';

const AddEevnt = () => {
    const [item, setItem] = useState({

        userId:'',
        name: '',
        event: '',
        category:'',
        location: '',
        time:'',
        date:'',
        description: '',
        price:'',
        contact:''
        

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
        formData.append("category",item.category)
        formData.append("location",item.location)
        formData.append("time",item.time)
        formData.append("date",new Date(item.date))
        formData.append("price",Number(item.price))
        formData.append("image",image)
        const response = await axios.post(`${url}/api/event/add`, formData, {
            headers: { 'Content-Type': 'multipart/form-data',
                         'Authorization': `Bearer ${token}`
             } // Important for file uploads
        });
        if (response.data.success){
            setItem({
                
                userId:'',
                name: '',
                category: '',
                location: '',
                description: '',
                contact:'',
                time:'',
                date:'',
                price:'',
            
        
            })
            setImage(false)
            toast.success("Application Submitted")
            
        }
        else {
            toast.error(response.data.message)
    
        }

    };

    return (
        <div className="add-item-page-1">
            <h2>List Your Event For other People To Join</h2>
            <form onSubmit={handleSubmit}>
                <div className='add-img-upload'>
                    <p>upload image</p>                    
                        <label htmlFor="image">
                            <img src={image ? URL.createObjectURL(image) : assets1.upload_area} alt=""/>
                        </label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            hidden required
                        />    
                </div>

                <div className='add-name'>
                    <p>Name Of the Event</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Event Name"
                        value={item.name}
                        onChange={handleChange}
                    />
                </div >
                <div className='add-category'>
                    <p>Choose Event</p>
                    <select onChange={handleChange} name="category">
                        <option value="New Years Eve Parties">New Year's Eve Parties</option>
                        <option value="Birthday">Christmas Parties</option>
                        <option value="Halloween Parties">Halloween Parties</option>
                        <option value="Diwali Celebrations">Diwali Celebrations</option>
                        <option value="Music festivals">Music festivals</option>
                        <option value="Concerts and live performances">Concerts and live performances</option>
                        <option value="DJ nights">DJ nights</option>
                        <option value="Fundraising concerts">Fundraising concerts</option>
                        <option value="walks or runs">walks or runs </option>
                        <option value="Volunteer events">Volunteer events</option>
                        <option value="Theatrical Performances">Theatrical Performances</option>
                        <option value="Talent Shows">Talent Shows</option>
                        <option value="Professional training sessions">Professional training sessions</option>
                        <option value="Workshops and seminars">Workshops and seminars</option>
                        <option value="Dance Parties">Dance Parties</option>
                        <option value="Marathons">Marathons</option>
                        <option value="Sporting tournaments">Sporting tournaments</option>
                        <option value="Amateur sporting events">Amateur sporting events</option>
                        <option value="Charity sports events">Charity sports events</option>
                        <option value="ArtExhibitions">Art Exhibitions</option>
                        <option value="Crowdfunding Campaigns">Crowdfunding Campaigns</option>
                        <option value="Arts and crafts festivals">Food festivals</option>
                        <option value="Public speeches and town halls">Public speeches and town halls</option>
                        <option value="Literary Festivals">Literary Festivals</option>
                        <option value="Food Festivals">Food Festivals</option>
                        <option value="Picnics">Picnics</option>
                        <option value="Camping Trips">Camping Trips</option>
                        <option value="Hiking Trips">Hiking Trips</option>
                        <option value="Hiking Trips">Hiking Trips</option>
                        <option value="Esports Tournament">Esports Tournament</option>
                        <option value="Spiritual Retreats"> Spiritual Retreats</option>
                        <option value="Rap Cypher"> Rap Cypher</option>
                    </select>
                </div>
                <div className='add-location'>
                    <p>Enter Event Location</p>
                    <input
                        type="text"
                        name="location"
                        placeholder="Event Location"
                        value={item.location}
                        onChange={handleChange}
                    />
                </div>
                <div className='add-date'>
                    <p>Select Event Date</p>
                    <input
                        type="date"
                        name="date"
                        value={item.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='add-time'>
                    <p>Select Event time</p>
                    <input
                        type="time"
                        name="time"
                        value={item.time}
                        onChange={handleChange}
                        required
                    />
                </div>
               
            
                <div className='add-phone'>
                    <p>Enter Contact Number</p>
                    <input
                        type="number"
                        name="contact"
                        placeholder="Contact"
                        value={item.contact}
                        onChange={handleChange}
                    />
                </div>
                <div className='add-price'>
                    <p>Joining Fees To Attend</p>
                    <input
                        type="number"
                        name="price"
                        placeholder="If free enter 0"
                        value={item.price}
                        onChange={handleChange}
                    />
                </div>
                

                <div className='add-desc'>
                    <p>Describe Your Event</p>
                    <textarea
                        name="description"
                        placeholder="Describe your Event"
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

export default AddEevnt;