import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../UI/Logo";
import axios from 'axios';

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
        const res = await axios.get("http://localhost:3001/getOneAdmin", {
          params: { username }
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
          <div className="container flex flex-row">
            <div className="w-1/2">
              <a href="/Admin" className="flex justify-content-end w-full"><Logo height='4rem' className="mt-6 mb-0" /></a>
              </div>
            {/* <button
              className="navbar-toggler ps-0"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarExample01"
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon d-flex justify-content-start align-items-center">
                <i className="fas fa-bars"></i>
              </span>
            </button> */}
            <div className="navbar-collapse w-1/2" id="navbarExample01">
              <div style={{fontFamily: "Bebas Neue", fontWeight: 400, fontSize: "3vw"}}>Pharmacy</div>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown group">
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
                        <span className="hidden md:inline">
                          {sessionStorage.getItem("Username")}
                        </span>
                      </a>
                      <div className="dropdown-menu absolute hidden group-hover:block" aria-labelledby="navbarDropdown">
                        <span className="nav-link" aria-current="page">Email: {userInfo.Email}</span>
                        <div className="dropdown-divider"></div>
                        <a className="nav-link" aria-current="page" href="/changePassword">Change password</a>
                        <a
                          className="nav-link"
                          aria-current="page"
                          href="/"
                          onClick={() => {
                            sessionStorage.removeItem("Username");
                            sessionStorage.removeItem("type");
                            sessionStorage.removeItem("token");
                          }}
                        >
                          Log Out
                        </a>
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