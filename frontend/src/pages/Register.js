import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';
import { Link,useNavigate } from 'react-router-dom';
import '@vaadin/react-components';
import {DatePicker} from '@vaadin/react-components';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    profilePicture: null
  });

  const [profilePreview, setProfilePreview] = useState(null);

  const { fname, lname, email, gender, dateOfBirth, mobile, password, confirmPassword, profilePicture } = formData;

  const onChange = e => {
    if (e.target.name === 'profilePicture' && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePicture: file });
      const reader = new FileReader();
      reader.onload = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      const formDataWithFile = new FormData();
      formDataWithFile.append('fname', fname);
      formDataWithFile.append('lname', lname);
      formDataWithFile.append('email', email);
      formDataWithFile.append('gender', gender);
      formDataWithFile.append('dateOfBirth', dateOfBirth);
      formDataWithFile.append('mobile', mobile);
      formDataWithFile.append('password', password);
      if (profilePicture) {
        formDataWithFile.append('profilePicture', profilePicture);
      }
  
      try {
        const response = await axios.post('/api/auth/register', formDataWithFile, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        alert('Registration successful!');
        navigate('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        if (error.response && error.response.data) {
          alert(`Registration failed: ${error.response.data.message}`);
        } else {
          alert('Registration failed. Please try again.');
        }
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
  
  return (
    <div className="body1">
      <div className="container2">
        <h1 className='register'>Register</h1>
        <form onSubmit={onSubmit} className='registerform'>
          <div className="profile-picture">
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={onChange}
              accept=".jpg, .jpeg, .png"
              style={{ display: 'none' }}
            />
            <label htmlFor="profilePicture">
              <div className="profile-picture-container">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile Preview" className="profile-preview" />
                ) : (
                  <div className="camera-icon">&#128247;</div>
                )}
              </div>
            </label>
          </div>
          <div style={{justifyContent:'center',alignItems:'center',marginLeft:'10px'}}>
          <div className='names'>
            <div className="form-group">
              <input className='inputregister1'
                type="text"
                id="fname"
                placeholder="First Name"
                name="fname"
                value={fname}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input className='inputregister1'
                type="text"
                id="lname"
                placeholder="Last Name"
                name="lname"
                value={lname}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="form-group" style={{width:'102%'}}>
            <input className='inputregister'
              type="email"
              id="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='group'>
            <div className="form-group" style={{width:'100%'}}>
              <input className='inputregister3'
                type="text"
                id="mobile"
                placeholder="Mobile Number"
                name="mobile"
                value={mobile}
                onChange={handleMobileInput}
                onPaste={handleMobilePaste}
                required
              />
            </div>
            <div className="form-group" style={{marginRight:'10px',width:'100%'}}>
              <select className='selectregister'
                id="gender"
                name="gender"
                value={gender}
                onChange={onChange}
                required
              >
                <option className='optionclass' value="">Select Gender</option>
                <option className='optionclass' value="Male">Male</option>
                <option className='optionclass' value="Female">Female</option>
                <option className='optionclass' value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-group1">
            <label className="label1" htmlFor="dateOfBirth" style={{width:'50%',marginRight:'10px'}}>Date of Birth:</label>
            <DatePicker
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={onChange}
              style={{width:'70%',marginRight:'10px',marginLeft:'11px',margin:'0.25rem 0',fontSize:'1rem',border: "1px solid #ddd", borderRadius: '4px', backgroundColor:'rgba(0, 0, 0, 0)',color:'white',boxSizing:'border-box'}}
              required
            />
          </div>
          <div className='passwords'>
            <div className="form-group">
              <input className='inputregister'
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
                required
              />
            </div>
            <div className="form-group">
              <input className='inputregister'
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                minLength="6"
                required
              />
            </div>
          </div>
          </div>
          <input type="submit" value="Register" />
        </form>
        <div className="return-link">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
