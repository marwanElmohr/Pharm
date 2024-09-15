import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleUser, faCartShopping, faPrescriptionBottle, faNotesMedical } from "@fortawesome/free-solid-svg-icons";
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
      if (!sessionStorage.getItem("Username")) {
        setUserInfo([]);
      } else {
        let username = sessionStorage.getItem("Username");
        const res = await axios.get("http://localhost:3001/getOnePatient", {
          params: { username }
        });
        setUserInfo(res.data);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleCart = () => {
    if (sessionStorage.getItem("Username")) {
      window.location.href = "/Cart";
    } else {
      window.location.href = "/Login";
    }
  };
  const handleOrders = () => {
    if (sessionStorage.getItem("Username")) {
      window.location.href = "/ViewOrders";
    } else {
      window.location.href = "/Login";
    }
  };
  const handlePrescriptions = () => {
    if (sessionStorage.getItem("Username")) {
      window.location.href = "/Prescriptions";
    } else {
      window.location.href = "/Login";
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
              <a href="/Admin" className="flex justify-content-end w-full"><Logo height='4rem' className="mt-6 mb-0" /></a>
            </div>
            <div className="navbar-collapse w-1/2 flex justify-content-end pe-3" id="navbarExample01">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item px-3 relative group">
                  <a className="nav-link" aria-current="page" onClick={handleCart}>
                    <FontAwesomeIcon icon={faCartShopping} />
                  </a>
                  <div className="absolute hidden group-hover:block right-1 p-3 shadow-lg bg-gray-400 opacity-70 text-white text-xs rounded px-2 py-1 z-20">
                    Cart
                  </div>
                </li>
                <li className="nav-item px-3 relative group">
                  <a className="nav-link" aria-current="page" onClick={handleOrders}>
                    <FontAwesomeIcon icon={faNotesMedical} />
                  </a>
                  <div className="absolute hidden group-hover:block right-0 p-3 shadow-lg bg-gray-400 opacity-70 text-white text-xs rounded px-2 py-1 z-20">
                    Orders
                  </div>
                </li>
                <li className="nav-item px-3 relative group">
                  <a className="nav-link" aria-current="page" onClick={handlePrescriptions}>
                    <FontAwesomeIcon icon={faPrescriptionBottle} />
                  </a>
                  <div className="absolute hidden group-hover:block -right-5 p-3 shadow-lg bg-gray-400 opacity-70 text-white text-xs rounded px-2 py-1 z-20">
                    Prescriptions
                  </div>
                </li>
                <li className="nav-item dropdown group relative ps-3">
                  {userInfo.length !== 0 ? (
                    <>
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
                          {sessionStorage.getItem("Username")}
                        </span>
                      </a>
                      <div className="dropdown-menu absolute hidden group-hover:block right-0 p-3 shadow-lg" aria-labelledby="navbarDropdown">
                        <span className="nav-link" aria-current="page">Email: {userInfo.Email}</span>
                        <span className="nav-link" aria-current="page">Phone number: {userInfo.phoneNumber}</span>
                        <a className="nav-link" aria-current="page" href="/Address">Add delivery address</a>
                        <a className="nav-link" aria-current="page" href="/changePassword">Change password</a>
                        <a className="nav-link" aria-current="page" href='/'
                          onClick={() => {
                            sessionStorage.removeItem("Username");
                            sessionStorage.removeItem("type");
                            sessionStorage.removeItem("token");
                          }}>Log Out</a>
                      </div>
                    </>
                  ) : (
                    <>
                      <a href="/login" className="flex items-center">
                        <FontAwesomeIcon icon={faCircleUser} className="fa-2x text-[#0284C7] mr-2" />
                        <span className="bg-[#0284C7] font-bold py-2 px-4 rounded-md text-[#ffffff] flex items-center">
                          Logg inn
                        </span>
                      </a>
                    </>
                  )}
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