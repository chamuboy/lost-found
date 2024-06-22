import React, { useState } from 'react';
import '../styles/rightpane.css';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import '@vaadin/react-components';
import {DatePicker} from '@vaadin/react-components';

const RightPane = ({ onFilter }) => {
  const [filterDistrict, setFilterDistrict] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [showItemsAvailableForBidding, setShowItemsAvailableForBidding] = useState(false);
  const [showItemsNotAvailableForBidding, setShowItemsNotAvailableForBidding] = useState(false);

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setFilterDistrict(value);
    applyFilters(value, initialDate, finalDate, showItemsAvailableForBidding, showItemsNotAvailableForBidding);
  };

  const handleInitialDateChange = (e) => {
    setInitialDate(e.target.value);
  };

  const handleFinalDateChange = (e) => {
    setFinalDate(e.target.value);
  };

  const handleItemsAvailableForBiddingChange = (e) => {
    const checked = e.target.checked;
    setShowItemsAvailableForBidding(checked);
    applyFilters(filterDistrict, initialDate, finalDate, checked, showItemsNotAvailableForBidding);
  };

  const handleItemsNotAvailableForBiddingChange = (e) => {
    const checked = e.target.checked;
    setShowItemsNotAvailableForBidding(checked);
    applyFilters(filterDistrict, initialDate, finalDate, showItemsAvailableForBidding, checked);
  };

  const handleSubmit = () => {
    applyFilters(filterDistrict, initialDate, finalDate, showItemsAvailableForBidding, showItemsNotAvailableForBidding);
  };

  const handleReset = () => {
    setFilterDistrict('');
    setInitialDate('');
    setFinalDate('');
    setShowItemsAvailableForBidding(false);
    setShowItemsNotAvailableForBidding(false);
    applyFilters('', '', '', false, false);
  };

  const applyFilters = (district, startDate, endDate, availableForBidding, notAvailableForBidding) => {
    onFilter(district, startDate, endDate, availableForBidding, notAvailableForBidding);
  };

  return (
    <div className="right-pane">
      <h2>Filter Options</h2>
      <div>
        <p>Filter By District:</p>
        <select value={filterDistrict} onChange={handleDistrictChange}>
          <option value="">Select District</option>
          <option value="Ampara">Ampara</option>
          <option value="Anuradhapura">Anuradhapura</option>
          <option value="Badulla">Badulla</option>
          <option value="Batticaloa">Batticaloa</option>
          <option value="Colombo">Colombo</option>
          <option value="Galle">Galle</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Hambantota">Hambantota</option>
          <option value="Jaffna">Jaffna</option>
          <option value="Kalutara">Kalutara</option>
          <option value="Kandy">Kandy</option>
          <option value="Kegalle">Kegalle</option>
          <option value="Kilinochchi">Kilinochchi</option>
          <option value="Kurunegala">Kurunegala</option>
          <option value="Mannar">Mannar</option>
          <option value="Matale">Matale</option>
          <option value="Matara">Matara</option>
          <option value="Moneragala">Moneragala</option>
          <option value="Mullaitivu">Mullaitivu</option>
          <option value="Nuwara Eliya">Nuwara Eliya</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Puttalam">Puttalam</option>
          <option value="Ratnapura">Ratnapura</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Vavuniya">Vavuniya</option>
        </select>
      </div>
      <div>
        <p>Filter By Bidding Availability:</p>
        <Checkbox checked={showItemsAvailableForBidding} onChange={handleItemsAvailableForBiddingChange} label="Bidding Available" />
        <Checkbox checked={showItemsNotAvailableForBidding} onChange={handleItemsNotAvailableForBiddingChange} label="Bidding Not Available" />
      </div>
      <div>
        <p>Filter By Date:</p>
        <DatePicker  value={initialDate} onChange={handleInitialDateChange} style={{width:'100%'}}/>
        <DatePicker  value={finalDate} onChange={handleFinalDateChange} style={{width:'100%'}} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default RightPane;
