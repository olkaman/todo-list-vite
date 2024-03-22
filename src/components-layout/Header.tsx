import React, { useContext } from 'react';
import { authContext } from '../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, login, logout } = useContext(authContext);

  const handleLogin: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    login();
  };

  const handleLogout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <a href='#' onClick={handleLogout}>
          Logout
        </a>
      ) : (
        <a href='#' onClick={handleLogin}>
          Login
        </a>
      )}
    </div>
  );
}
