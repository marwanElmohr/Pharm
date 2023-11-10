import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <Menu>
      <a className="menu-item" href="/Admin">
        Home
      </a>
      <a className="menu-item" href="/AddAdmin">
        Add an administrator
      </a>
      <a className="menu-item" href="/ViewPharmInfoAdmin">
        View pharmacists
      </a>
      <a className="menu-item" href="/ViewPatientInfoAdmin">
        View patients
      </a>
      <a className="menu-item" href="/ViewRequestsAdmin">
        View requests
      </a>
      <a className="menu-item" href="/ViewMedAdmin">
        View medicines
      </a>
      <a className="menu-item">
        Change my password
      </a>
      <a className="menu-item"
        onClick={() => {
          sessionStorage.removeItem("Username");
          sessionStorage.removeItem("type");
          sessionStorage.removeItem("token");
          window.location.replace("/");
        }}
      >
        Logout
      </a>
    </Menu>
  );
};

export default Sidebar;