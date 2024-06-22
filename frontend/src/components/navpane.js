import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@vaadin/react-components/Icon.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import '@vaadin/icons';
import '../styles/navpane.css';

const categories = [
  "All", "Personal Belongings", "Electronics", "Accessories", "Documents", "Clothing",
  "Sporting Goods", "Musical Instruments", "Books and Stationery", "Miscellaneous"
];

const NavPane = ({ onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const togglePane = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubItems = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <>
      <button className={`menu-button ${isOpen ? 'open' : ''}`} onClick={togglePane}>
        ☰
      </button>
      <div className={`nav-pane ${isOpen ? 'open' : ''}`}>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/account-details" className="main-item">
              <HorizontalLayout>
                <Icon icon="vaadin:user" />
                <span>My Account</span>
              </HorizontalLayout>
            </Link>
          </li>
          <li>
            <Link to="/upload-item" className="main-item">
              <HorizontalLayout>
                <Icon icon="vaadin:cloud-upload" />
                <span>Add Item</span>
              </HorizontalLayout>
            </Link>
          </li>
          <li>
            <Link to="/my-items" className="main-item">
              <HorizontalLayout>
                <Icon icon="vaadin:clipboard" />
                <span>My Items</span>
              </HorizontalLayout>
            </Link>
          </li>
          <li>
            <div onClick={() => toggleSubItems(2)} className="main-item">
              <HorizontalLayout>
                <Icon icon="vaadin:folder-open" />
                <span>Categories</span>
              </HorizontalLayout>
            </div>
            {expandedItem === 2 && (
              <ul className="sub-items">
                {categories.map((category, index) => (
                  <li key={index}>
                    <div className="sub-item" onClick={() => onCategorySelect(category)}>
                      {category}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavPane;
