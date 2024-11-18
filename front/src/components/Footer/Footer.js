import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img className='foot-pic'src={assets.logo_1} alt=""/>
                {/* <p>hhhdhdhdisiyeytroo itoottmyr rjttiiifjghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhnnnnnnnnnnnnnnngggggggggggggggggggggnhdhhss  h dfffcvvgbhhnjjfhhhhhhhfbfgghehehehytdyudjdjjdjdjdjjdj fbgfgftrjhuykilsjfhs</p>
                <div className='footer-social-icon'>
                    <img src={assets.facebook_icon} alt=""/>
                    <img src={assets.twitter_icon} alt=""/>
                    <img src={assets.linkedin_icon} alt=""/>
                </div> */}
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>home</li>
                    <li>about us</li>
                    <li>delivery policy</li>
                    <li>privacy</li>
                </ul>

            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-983565425</li>
                    <li>contact@gmail.com</li>
                    
                </ul>

            </div>

        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2024 © Tomato.com - All Rights Reserved</p>


      
    </div>
  )
}

export default Footer
