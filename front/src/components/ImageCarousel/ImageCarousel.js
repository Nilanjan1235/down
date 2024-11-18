
import { img_list } from "../../images/Images"; // Ensure this path is correct
import React, { useState, useEffect } from 'react';
import "./ImageCarousel.css";

export default function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically change the image every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === img_list.length - 1 ? 0 : prevIndex + 1
            );
            
        }, 30000); // Change image every 3000 milliseconds (3 seconds)

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures it runs only once on mount

    // Handle the left button click
    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? img_list.length - 1 : prevIndex - 1
        );
    };

    // Handle the right button click
    const handleRightClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === img_list.length - 1 ? 0 : prevIndex + 1
        );
    };


    return (
        <div className="control">
            {/* Left button */}
            <div className="left-btn" onClick={handleLeftClick}>
                {"<"}
            </div>

            {/* Image */}
            <img src={img_list[currentIndex].image} alt={img_list[currentIndex].description || `Slide ${currentIndex + 1}`} />

            {/* Right button */}
            <div className="right-btn" onClick={handleRightClick}>
                {">"}
            </div>
        </div>
    );
}