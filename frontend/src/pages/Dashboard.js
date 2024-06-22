import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';
import NavPane from '../components/navpane';
import RightPane from '../components/rightpane';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [showItemsAvailableForBidding, setShowItemsAvailableForBidding] = useState(false);
  const [showItemsNotAvailableForBidding, setShowItemsNotAvailableForBidding] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleFilter = (district, initial, final, availableForBidding, notAvailableForBidding) => {
    setFilterDistrict(district);
    setInitialDate(initial);
    setFinalDate(final);
    setShowItemsAvailableForBidding(availableForBidding);
    setShowItemsNotAvailableForBidding(notAvailableForBidding);
  };

  const filteredItems = items.filter(item =>
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'All' ? true : item.category === selectedCategory) &&
    (filterDistrict === '' ? true : item.district === filterDistrict) &&
    (initialDate === '' || finalDate === '' ? true :
      new Date(item.dateFound) >= new Date(initialDate) && new Date(item.dateFound) <= new Date(finalDate)) &&
    ((showItemsAvailableForBidding && item.bid === 'Available for bidding after 30 days' && new Date(item.date) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (showItemsNotAvailableForBidding && !(item.bid === 'Available for bidding after 30 days' && new Date(item.date) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))) ||
      (!showItemsAvailableForBidding && !showItemsNotAvailableForBidding))
  ).sort((a, b) => new Date(b.dateFound) - new Date(a.dateFound)); // Sort in reverse order

  return (
    <div className="maindivision">
      <NavPane onCategorySelect={handleCategorySelect}></NavPane>
      <div className="division1">
        <input
          type="text"
          placeholder="Search by name or location"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        {filteredItems.length === 0 ? (
          <p>Nothing to display on the dashboard</p>
        ) : (
          <ul className="item-list">
            {filteredItems.map(item => (
              <li key={item._id} className="item" onClick={() => handleItemClick(item._id)}>
                <div className="item-image">
                  {item.image && <img src={`https://lost-found-agv1.onrender.com/${item.image}`} alt={item.title} />}
                </div>
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>Location: {item.location}</p>
                  <p>Date Found: {new Date(item.dateFound).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <RightPane
        onFilter={handleFilter}
      >
      </RightPane>
    </div>
  );
};

export default Dashboard;
