import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/mainpage.css';

const MainPage = () => {
  return (
    <div className="home-container">
        <h2 className='oneh2'>Lost something?</h2>
        <h2 className='twoh2'>Find it with our App!</h2>
        <p className='onep'>Discover millions of items posted nationwide at your fingertips.</p>
        <p className='twop'>Add items to auction after a month and earn money!</p>
        <Link to="/login"><button>Start The Journey</button></Link>
    </div>
  );
};

export default MainPage;
