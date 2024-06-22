import React from 'react';
import '../styles/aboutus.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>Our Vision</h2>
        <p>Our vision is to create a community where lost items can easily be reunited with their owners. We aim to reduce the frustration and inconvenience caused by misplacing items by providing a platform for people to report and find lost belongings.</p>
        
        <h2>Our Mission</h2>
        <p>Our mission is to help people find the items they misplace by allowing users to submit those items to the app if they are found. We also facilitate bidding after a certain period, making it beneficial for users if no owners are observed for a longer time. This encourages users to upload found items promptly.</p>
        
        <h2>How It Works</h2>
        <p>When you find a lost item, you can upload its details and photo to our app. If the owner claims it within a month, it's returned to them. If not, the item is put up for auction, and you have the chance to earn some money from it.</p>
        
        <h2>Join Us</h2>
        <p>Be a part of our community and help others find their lost items. Your small act of kindness can make a big difference in someone's day. Sign up now to start uploading found items or to look for something you have lost.</p>
      </div>
    </div>
  );
}

export default AboutUs;
