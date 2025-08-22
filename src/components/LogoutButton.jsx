import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant="danger"
      size="sm"
      className="position-fixed logout-btn"
      style={{ 
        top: '10px', 
        right: '10px', 
        zIndex: 999,
        fontSize: '0.75rem',
        padding: '0.25rem 0.5rem',
        minWidth: 'auto'
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
