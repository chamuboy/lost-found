import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/accountdetails.css';

const AccountDetails = ({ user }) => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    mobile: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    profilePicture: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.fname || '',
        lname: user.lname || '',
        mobile: user.mobile || '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        profilePicture: user.profilePicture || null
      });
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }
      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': token
      };

      const response = await axios.get('/api/auth/user', { headers });
      const userData = response.data;

      setFormData({
        fname: userData.fname || '',
        lname: userData.lname || '',
        mobile: userData.mobile || '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        profilePicture: userData.profilePicture || null
      });

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setError('Failed to fetch user data. Please try again.');
      setLoading(false);
    }
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateField = async (field, value) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }
      const body = { [field]: value };
      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': token
      };

      const response = await axios.put('/api/auth/user/update', body, { headers });
      console.log(`Update successful for ${field}:`, response.data);
      fetchUserData();
    } catch (error) {
      if (error.response) {
        console.error(`Failed to update ${field}:`, error.response.data);
      } else {
        console.error(`Failed to update ${field}:`, error.message);
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword !== formData.confirmNewPassword) {
      setFormData({
        ...formData,
        newPassword: '',
        confirmNewPassword: ''
      });
      alert('Passwords do not match');
      return;
      
    }

    if (formData.newPassword === formData.password) {
      setFormData({
        ...formData,
        newPassword: '',
        confirmNewPassword: ''
      });
      alert('The new password is same as the current password');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }

      const body = {
        currentPassword: formData.password,
        newPassword: formData.newPassword,
      };
      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': token
      };

      const response = await axios.put('/api/auth/user/update-password', body, { headers });
      console.log('Password update successful:', response.data);
      alert('Password updated successfully');

      setFormData({
        ...formData,
        password: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      
    } catch (error) {
      if (error.response) {
        setFormData({
          ...formData,
          password: ''
        });
        alert('Current Password is incorrect');
      }
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }

      const headers = {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token
      };

      const response = await axios.put('/api/auth/user/update-profile-picture', formData, { headers });
      console.log('Profile picture updated successfully:', response.data);
      fetchUserData();
    } catch (error) {
      if (error.response) {
        console.error('Failed to update profile picture:', error.response.data);
        setError('Failed to update profile picture. Please try again.');
      } else {
        console.error('Failed to update profile picture:', error.message);
        setError('Failed to update profile picture. Please try again.');
      }
    }
  };

  const handleMobileInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    onChange(e);
  };

  const handleMobilePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    if (!/^\d+$/.test(pastedData)) {
      e.preventDefault();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const { fname, lname, mobile, profilePicture } = formData;

  return (
    <div className="body3">
      <div className="container3">
        <h1 className="accounttext">Account Details</h1>
        <form className="accountform" encType="multipart/form-data">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
              <span className="edit-btn">
                <label htmlFor="profilePicture" className="edit-label">
                  Edit Profile Picture
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </span>
            <img src={profilePicture} alt="Profile" className="profile-img" />
          </div>
          <div className="form-group">
            <label className="label">First Name:</label>
            {fname ? (
              <>
                <span>{fname}</span>
                <button onClick={() => updateField('fname', prompt('Enter new first name:'))}>
                  Edit First Name
                </button>
              </>
            ) : (
              <input
                type="text"
                name="fname"
                value={fname}
                onChange={onChange}
                placeholder="Insert new first name"
              />
            )}
          </div>
          <div className="form-group">
            <label className="label">Last Name:</label>
            {lname ? (
              <>
                <span>{lname}</span>
                <button onClick={() => updateField('lname', prompt('Enter new last name:'))}>
                  Edit Last Name
                </button>
              </>
            ) : (
              <input
                type="text"
                name="lname"
                value={lname}
                onChange={onChange}
                placeholder="Insert new last name"
              />
            )}
          </div>
          <div className="form-group">
            <label className="label">Mobile:</label>
            {mobile ? (
              <>
                <span>{mobile}</span>
                <button onClick={() => updateField('mobile', prompt('Enter new mobile number:'))}>
                  Edit Contact Number
                </button>
              </>
            ) : (
              <input
                type="text"
                name="mobile"
                value={mobile}
                onChange={handleMobileInput}
                onPaste={handleMobilePaste}
                placeholder="Insert new mobile number"
              />
            )}
          </div>
        </form>
        <label className="edit-label" onClick={() => setShowPasswordFields(!showPasswordFields)}>
          {showPasswordFields ? 'Cancel' : 'Change Password'}
        </label>
        {showPasswordFields && (
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label className="label">Current Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder="Current password"
                className='pwinput'
              />
            </div>
            <div className="form-group">
              <label className="label">New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={onChange}
                placeholder="New password"
                className='pwinput'
              />
            </div>
            <div className="form-group">
              <label className="label">Confirm New Password:</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={onChange}
                placeholder="Confirm new password"
                className='pwinput'
              />
            </div>
            <button type="submit" className='submit-btn'>Update Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
