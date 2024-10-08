import React from "react";
import Sidebar from "./SidebarHome";
import '../Pages/Patient/Patient.scss'
import '../Pages/Admin/Admin.scss'
import '../Pages/Bootstrap.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faHandHoldingMedical,
  faPrescriptionBottleMedical,
  faCartShopping,
  faPrescription
} from "@fortawesome/free-solid-svg-icons";
import Slider from "../Components/slider";
import MedicineCarousel from "../Components/MedicineCarousel";
import Footer from "../Components/Footer";

export default function Patient() {
  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="Bootstrap Patient">
        <Slider />
        <div className="footer container-fluid px-5">
          <div className="headers relative">
            <h3 className="h3border">Recommended</h3>
          </div>
          <MedicineCarousel />

          <div className="relative px-5 mt-5">
            <h3>Category name</h3>
          </div>
          <MedicineCarousel />

          <div className="relative px-5 mt-5">
            <h3>Category name</h3>
          </div>
          <MedicineCarousel />

          <div className="relative px-5 mt-5">
            <h3>Category name</h3>
          </div>
          <MedicineCarousel />

          <div className="container">
            <div className="footer-in row">
              {/* <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
                <FontAwesomeIcon
                  icon={faPrescription}
                  size="4x"
                  style={{ color: "#0284C7" }}
                />
                <a href="/ViewMedPrescriptions" style={{ textDecoration: "none" }}>
                  <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                    Prescription Medicine
                  </h3>
                </a>
                <p style={{ textAlign: "center", color: "gray" }}>View all prescription medicines</p>
              </div>
              <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
                <FontAwesomeIcon
                  icon={faHandHoldingMedical}
                  size="4x"
                  style={{ color: "#0284C7" }}
                />
                <a href="/ViewMedPatient" style={{ textDecoration: "none" }}>
                  <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>
                    Over the Counter Medicine
                  </h3>
                </a>
                <p style={{ textAlign: "center", color: "gray" }}>View all over the counter medicines</p>
              </div>
              <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  size="4x"
                  style={{ color: "#0284C7" }}
                />
                <a href="/Cart" style={{ textDecoration: "none" }}>
                  <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>Cart</h3>
                </a>
                <p style={{ textAlign: "center", color: "gray" }}>View all the medicines added to your cart</p>
              </div>
              <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
                <FontAwesomeIcon
                  icon={faPrescriptionBottleMedical}
                  size="4x"
                  style={{ color: "#0284C7" }}
                />
                <a href="ViewOrders" style={{ textDecoration: "none" }}>
                  <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>Orders</h3>
                </a>
                <p style={{ textAlign: "center", color: "gray" }}>View past/current orders' details</p>
              </div>
              <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
                <FontAwesomeIcon
                  icon={faFileCirclePlus}
                  size="4x"
                  style={{ color: "#0284C7" }}
                />
                <a href="/Address" style={{ textDecoration: "none" }}>
                  <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>Delivery address</h3>
                </a>
                <p style={{ textAlign: "center", color: "gray" }}>Add a new delivery address</p>
              </div> */}
              {/* <div className="col-4 text-center d-flex flex-column align-items-center bg-sky-50">
              <FontAwesomeIcon
                icon={faSyringe}
                size="4x"
                style={{ color: "#0284C7" }}
              />
              <a href="/ChatApp" style={{ textDecoration: "none" }}>
                <h3 style={{ fontSize: "30px", textAlign: "center", marginTop: "10px" }}>Pharmacy</h3>
              </a>
              <p style={{ textAlign: "center", color: "gray" }}>Chat with a pharmacist</p>
            </div> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}