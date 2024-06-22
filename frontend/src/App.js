import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import Header from './components/header';
import Register from './pages/Register';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import UploadItem from './pages/UploadItem';
import Dashboard from './pages/Dashboard';
import ItemDetails from './pages/ItemDetails';
import MyItems from './pages/UserItems';
import ProtectedRoute from './utils/ProtectedRoute'
import AccountDetails from './pages/AccountDetails';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HelpCenter from './pages/HelpCenter';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path ="/register" element={<Register />} />
          <Route path ="/login" element={<Login />} />
          <Route path="/upload-item" element={<ProtectedRoute><UploadItem /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/item/:id" element={<ProtectedRoute><ItemDetails/></ProtectedRoute>}/>
          <Route path="/my-items" element={<ProtectedRoute><MyItems/></ProtectedRoute>} />
          <Route path="/account-details" element={<ProtectedRoute><AccountDetails/></ProtectedRoute>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/help" element={<HelpCenter/>} />
        </Routes>
        <Footer></Footer>
      </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
