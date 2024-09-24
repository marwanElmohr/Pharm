import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../UI/Logo";
import axios from 'axios';
import Burger from "../Components/Burger";

const Sidebar = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      if (!localStorage.getItem("token")) {
        setUserInfo([]);
      } else {
        const res = await axios.get("http://localhost:3001/getOneAdmin", {
          headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        });
        setUserInfo(res.data);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="Bootstrap Patient">
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-scroll nav-color-bg">
          <div className="container-fluid flex flex-row">
            <div className="mx-2">
              <Burger />
            </div>

            <div className="w-1/2">
              <a href="/Admin" className="flex justify-content-end w-full">
                <Logo height='4rem' className="mt-6 mb-0" />
              </a>
            </div>
            <div className="navbar-collapse w-1/2 flex justify-content-end pe-3" id="navbarExample01">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item px-1">
                  <a className="nav-link" aria-current="page" href="/ViewAdminInfoAdmin">
                    View Admins
                  </a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link" aria-current="page" href="/ViewPharmInfoAdmin">
                    View Pharmacists
                  </a>
                </li><li className="nav-item px-1">
                  <a className="nav-link" aria-current="page" href="/ViewPharmInfoAdmin">
                    View Pharmacists
                  </a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link" aria-current="page" href="/ViewPatientInfoAdmin">
                    View Patients
                  </a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link" aria-current="page" href="/ViewMedAdmin">
                    View Medicines
                  </a>
                </li>
                <li className="nav-item pl-1 pr-4">
                  <a className="nav-link" aria-current="page" href="/ViewSalesAdmin">
                    Sales Report
                  </a>
                </li>
                <li className="nav-item dropdown group relative">
                  <a
                    className="nav-link dropdown-toggle flex items-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    <span>
                      {userInfo.Username}
                    </span>
                  </a>
                  <div className="dropdown-menu absolute hidden group-hover:block right-0 p-3 shadow-lg" aria-labelledby="navbarDropdown">
                    <span className="nav-link" aria-current="page">Email: {userInfo.Email}</span>
                    <a className="nav-link" aria-current="page" href="/changePassword">Change password</a>
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/"
                      onClick={() => {
                        localStorage.clear();
                      }}
                    >
                      Log Out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;