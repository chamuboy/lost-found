import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/uploaditem.css';

const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const categories = [
  "Personal Belongings", "Electronics", "Accessories", "Documents", "Clothing",
  "Sporting Goods", "Musical Instruments", "Books and Stationery", "Miscellaneous"
];

const bids = ["No Bidding","Available for bidding after 30 days"];

const UploadItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    district: '',
    location: '',
    contactNumber: '',
    dateFound: '',
    bid: '',
    image: null
  });

  const { title, category, description, district, location, contactNumber, dateFound, bid } = formData;
  const navigate = useNavigate();

  const onChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    formDataWithImage.append('title', title);
    formDataWithImage.append('category', category);
    formDataWithImage.append('description', description);
    formDataWithImage.append('district', district);
    formDataWithImage.append('location', location);
    formDataWithImage.append('contactNumber', contactNumber);
    formDataWithImage.append('dateFound', dateFound);
    formDataWithImage.append('bid', bid);
    formDataWithImage.append('image', formData.image);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/items', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(res.data);
      alert('Item uploaded successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      alert('Failed to upload item');
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Item</h1>
      <form onSubmit={onSubmit} className='form'>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Item Category</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={onChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="district">District</label>
          <select
            id="district"
            name="district"
            value={district}
            onChange={onChange}
            required
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Specific Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={contactNumber}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateFound">Date Found</label>
          <input
            type="date"
            id="dateFound"
            name="dateFound"
            value={dateFound}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bid">Bidding</label>
          <select
            id="bid"
            name="bid"
            value={bid}
            onChange={onChange}
            required
          >
            <option value="">Select Bidding Option</option>
            {bids.map((bid, index) => (
              <option key={index} value={bid}>{bid}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" value="Upload Item" />
      </form>
    </div>
  );
};

export default UploadItem;
