import React, { useState } from "react";
import Sidebar from "../../Components/SidebarPharm";
import NotificationPopup from "./NotificationPopup";
import './Pharm.scss'
import '../Bootstrap.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingMedical,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";

export default function Pharm() {
  const [notifications, setNotifications] = useState([]);

  return (
    <div className="Bootstrap Pharm">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="footer mt-20">
        <div className="headers">
          <h3>Choose one of our services</h3>
        </div>
        <div className="footer-in row">
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faHandHoldingMedical}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ViewMedPharm" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Medicine
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View all available medicines</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faSyringe}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ViewSales" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Sales Report
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>View sales based on a chosen month</p>
          </div>
          {/* <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faPrescriptionBottleMedical}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ChatAppD" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Clinic
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>Chat with a doctor</p>
          </div>
          <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
            <FontAwesomeIcon
              icon={faUserInjured}
              size="4x"
              style={{ color: "#0284C7" }}
            />
            <a href="/ChatAppP" style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                Patient
              </h3>
            </a>
            <p style={{ textAlign: "center", color: "gray" }}>Chat with a patient</p>
          </div> */}
        </div>
        <div className="text-center mt-10">
          <NotificationPopup notifications={notifications} />
        </div>
      </div>
    </div>
  );
}