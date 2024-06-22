import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { ConfirmDialog } from '@vaadin/react-components/ConfirmDialog.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import '../styles/useritems.css';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    district: '',
    location: '',
    contactNumber: '',
    dateFound: '',
    image: null,
  });
  const [viewBidsItemId, setViewBidsItemId] = useState(null);

  const dialogOpened = useSignal(false);

  const categories = [
    "Personal Belongings", "Electronics", "Accessories", "Documents", "Clothing",
    "Sporting Goods", "Musical Instruments", "Books and Stationery", "Miscellaneous"
  ];

  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/items/my-items', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    setDeleteItemId(id);
    dialogOpened.value = true;
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/items/my-items/${deleteItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter(item => item._id !== deleteItemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItemId(item._id);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      district: item.district,
      location: item.location,
      contactNumber: item.contactNumber,
      dateFound: new Date(item.dateFound).toISOString().substring(0, 10),
      image: item.image
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, contactNumber: value });
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.put(`/api/items/my-items/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditingItemId(null);
      const updatedItems = items.map(item => (item._id === id ? { ...item, ...formData } : item));
      setItems(updatedItems);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const toggleViewBids = (id) => {
    setViewBidsItemId(viewBidsItemId === id ? null : id);
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    if (!/^\d+$/.test(paste)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div className="my-items-container">
        <h2>My Items</h2>
        {items.length === 0 ? (
          <p>Nothing to display</p>
        ) : (
          <ul>
            {items.map(item => (
              <li key={item._id} className="item-card">
                {editingItemId === item._id ? (
                  <form onSubmit={(e) => { e.preventDefault(); handleUpdate(item._id); }}>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
                    <select name="category" value={formData.category} onChange={handleInputChange} className='selection'>
                      <option value="">Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
                    <select name="district" value={formData.district} onChange={handleInputChange} className='selection'>
                      <option value="">Select District</option>
                      {districts.map((district, index) => (
                        <option key={index} value={district}>{district}</option>
                      ))}
                    </select>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" required />
                    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleContactNumberChange} placeholder="Contact Number" required onKeyPress={handleKeyPress} onPaste={handlePaste} />
                    <input type="date" name="dateFound" value={formData.dateFound} onChange={handleInputChange} required />
                    <input type="file" name="image" onChange={handleFileChange} />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingItemId(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <h2>{item.title}</h2>
                    <div className="item-details">
                      <div className='divv'>
                        <p>Category: {item.category}</p>
                        <p>Description: {item.description}</p>
                        <p>District: {item.district}</p>
                        <p>Location: {item.location}</p>
                        <p>Contact Number: {item.contactNumber}</p>
                        <p>Date Found: {new Date(item.dateFound).toLocaleDateString()}</p>
                      </div>
                      <div>
                        {item.image && <img src={`/${item.image}`} alt={item.title} className="item-image" />}
                      </div>
                    </div>
                    <div className='div1'>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                      <button onClick={() => handleDelete(item._id)}>Delete</button>
                      {item.bids && item.bids.length > 0 && (
                        <button onClick={() => toggleViewBids(item._id)}>
                          {viewBidsItemId === item._id ? 'Hide Bids' : 'View Bids'}
                        </button>
                      )}
                    </div>
                    {viewBidsItemId === item._id && (
                      <div className="bidding-section">
                        <h3>Bidding</h3>
                        <table className="bids-table">
                          <thead>
                            <tr>
                              <th>Bid Amount</th>
                              <th>Name</th>
                              <th>Mobile</th>
                              <th>Email</th>
                              <th>Bid Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.bids && item.bids.map((bid, index) => (
                              <tr key={index}>
                                <td>Rs. {bid.bidAmount}</td>
                                <td>{bid.firstName} {bid.lastName}</td>
                                <td>{bid.mobile}</td>
                                <td>{bid.email}</td>
                                <td>{new Date(bid.bidDate).toLocaleDateString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'center' }} theme="spacing">
        <ConfirmDialog
          header="Delete Item"
          cancelButtonVisible
          confirmText="Delete"
          opened={dialogOpened.value}
          onOpenedChanged={(event) => {
            dialogOpened.value = event.detail.value;
          }}
          onConfirm={() => {
            confirmDelete(); 
            dialogOpened.value = false;
          }}
          onCancel={() => {
            dialogOpened.value = false;
          }}
        >
          Are you sure you want to delete this item?
        </ConfirmDialog>
      </HorizontalLayout>
    </div>
  );
};

export default MyItems;
