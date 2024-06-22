import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../images/bg1.png';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { ConfirmDialog } from '@vaadin/react-components/ConfirmDialog.js';
import '../styles/header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const dialogOpened = useSignal(false);
  const status = useSignal('');

  const handleLogout = () => {
    dialogOpened.value = true;
  };

  const handleLogoutConfirmed = async () => {
    try {
      await logout();
      dialogOpened.value = false;
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const handleLogoutCancelled = () => {
    dialogOpened.value = false;
  };

  const renderAuthButton = () => {
    if (!isAuthenticated) {
      return (
        <div>
          <Link to="/login">
            <Button className="btn1">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="btn2">Register</Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="auth-container">
          <Button className="logoutBtn" onClick={handleLogout}>
            Logout
          </Button>
          <ConfirmDialog
            header="Logout Confirmation"
            cancelButtonVisible
            confirmText="Logout"
            opened={dialogOpened.value}
            onOpenedChanged={(event) => (dialogOpened.value = event.detail.value)}
            onConfirm={handleLogoutConfirmed}
            onCancel={handleLogoutCancelled}
          >
            Are you sure you want to logout?
          </ConfirmDialog>
          <span className="status" hidden={status.value === ''}>
            Status: {status.value}
          </span>
        </div>
      );
    }
  };

  const renderDashboardLink = () => {
    if (isAuthenticated) {
      return (
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      );
    }
    return null;
  };

  return (
    <header>
      <img src={logo} alt="App Logo" className="app-logo" />
      <nav>{renderDashboardLink()}</nav>
      {renderAuthButton()}
    </header>
  );
};

export default Header;
