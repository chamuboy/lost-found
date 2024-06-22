import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/itemdetails.css';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log('Submitting bid with amount:', bidAmount);
      await axios.post(`/api/items/${id}/bids`, { amount: bidAmount }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Bid placed successfully');
      setBidAmount('');
    } catch (error) {
      console.error('Error placing bid:', error.response ? error.response.data : error.message);
    }
  };

  if (!item) {
    return <div className="loading1">Loading...</div>;
  }

  const { title, category, description, district, location, contactNumber, dateFound, image, user, bid, date } = item;

  const isAvailableForBidding = bid === 'Available for bidding after 30 days' && new Date(date) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="item-details1">
      <h1 className="item-title1">{title}</h1>
      <p className="item-category1"><strong>Item Category: </strong>{category}</p>
      <p className="item-description1"><strong>Description: </strong>{description}</p>
      <p className="item-district1"><strong>District Found: </strong>{district}</p>
      <p className="item-location1"><strong>Location:</strong> {location}</p>
      <p className="item-contactno1"><strong>Contact: </strong>{contactNumber}</p>
      <p className="item-date-found1"><strong>Date Found:</strong> {new Date(dateFound).toLocaleDateString()}</p>
      {image && <img className="item-image1" src={`https://lost-found-agv1.onrender.com/${image}`} alt={title} />}
      {isAvailableForBidding && (
        <div className="bid-section">
          <button className="bid-button" onClick={() => setShowBidForm(!showBidForm)}>
            {showBidForm ? 'Cancel' : 'Place Bids'}
          </button>
          {showBidForm && (
            <form onSubmit={handleBidSubmit} className="bid-form">
              <input
                type="number"
                placeholder="Enter your bid amount in Rs"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
              />
              <button type="submit" className="submit-bid-button">Submit Bid</button>
            </form>
          )}
        </div>
      )}
      {user ? (
        <div className='uploader-main'>         
          <div className="uploader-info1">
            <h2 className="uploader-title1">Uploaded by:</h2>
            <p className="uploader-name1"><strong>Name:</strong> {user.fname + ' ' + user.lname}</p>
            <p className="uploader-email1"><strong>Email:</strong> {user.email}</p>
            <p className="uploader-mobile1"><strong>Contact:</strong> {user.mobile}</p>
          </div>
          <div className='uploader-image'>
            <img className="uploader-profile-picture1" src={`https://lost-found-agv1.onrender.com/${user.profilePicture}`} alt={`${user.fname} ${user.lname}`} />
          </div>          
        </div>
      ) : (
        <p className="uploader-missing1">Uploader information is not available.</p>
      )}
      
    </div>
  );
};

export default ItemDetails;
