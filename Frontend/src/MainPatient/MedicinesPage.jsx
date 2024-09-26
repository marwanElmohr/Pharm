import React, { useState, useEffect } from "react";
import GetMedicine from "../Pages/getMedicine";
import GetMedicinalUse from "../Pages/getMedicinalUses";
import Sidebar from "./SidebarHome";
import Footer from "../Components/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";


export default function MedicinesPage() {
    const [name, setName] = useState();
    const [medicinaluse, setMedicinalUse] = useState();
    const [forceEffect, setForceEffect] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const [showAlternatives, setShowAlternatives] = useState(false);
    const OverTheCounter = true;
    const navigate = useNavigate();

    const HandleAlternatives = async (name) => {
        try {
            navigate(`/Alternatives?medicinename=${encodeURIComponent(name)}&OverTheCounter=${OverTheCounter}`);
        } catch (error) {
            console.error("Error fetching alternatives:", error);
        }
    }

    let MedicinalUses = GetMedicinalUse({});
    const uses = MedicinalUses || [];

    let Medicine = GetMedicine({
        Name: name,
        MedicinalUse: medicinaluse,
        OverTheCounter,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        Medicine = await GetMedicine({
            Name: name,
            MedicinalUse: medicinaluse,
            OverTheCounter,
        });
    };

    const handleAddToCart = async (name, price, availableQuantity) => {
        if (localStorage.getItem("type") === "Patient") {
            try {
                if (availableQuantity > 0) {
                    // Disable the button temporarily
                    setAddedToCart((prevAddedToCart) => ({
                        ...prevAddedToCart,
                        [name]: true,
                    }));

                    // Update the cart
                    axios.put("http://localhost:3001/updatePatient", {
                        medicinename: name,
                        quantity: 1,
                        price: price,
                    }, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }, });
                    console.log("Update request sent successfully");

                    // Wait for 2 seconds
                    setTimeout(() => {
                        // Enable the button after 2 seconds
                        setAddedToCart((prevAddedToCart) => ({
                            ...prevAddedToCart,
                            [name]: false,
                        }));
                    }, 500);
                } else {
                    setShowAlternatives(true);
                    console.log("Cannot add to cart. Insufficient quantity.");
                }
            } catch (error) {
                console.error("Error updating data:", error);
            }
        }
    };

    if (Medicine) {
        return (
            <div>
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                <section class="py-16">
                    <div class="mx-auto max-w-8xl px-2 sm:px-4 lg:px-10">
                        <h2 class="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">Available Products</h2>
                        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {Medicine.map((p, index) => (
                                <a key={index} href="/OneMedicine" className="bg-white border border-gray-200 sm:hover:shadow-lg rounded-xl p-4 transition-transform transform lg:hover:shadow-lg lg:hover:scale-105">
                                    <div className="w-full aspect-square">
                                        {p.Picture ? (
                                            <img
                                                src={
                                                    p.Picture.startsWith("http")
                                                        ? p.Picture // External URL
                                                        : `http://localhost:3001/uploads/${p.Picture.substring(p.Picture.lastIndexOf('/') + 1, p.Picture.lastIndexOf('-Picture'))}-Picture.jpg` // Local image
                                                }
                                                alt={p.Name}
                                                className="w-full h-full rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="rounded-xl w-full h-full bg-gray-300 flex items-center justify-center">{p.Name}</div>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <h6 className="font-medium text-xl leading-8 text-black mb-2 w-full">{p.Name}</h6>
                                        <div className="flex items-center justify-between">
                                            <h6 className="font-semibold text-2xl leading-8 text-sky-600">
                                                {p.Quantity > 0 ? (<>{p.Price} kr</>) : (<></>)}
                                            </h6>
                                            {p.Quantity > 0 ? (
                                                <button className="p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50"
                                                    onClick={() => handleAddToCart(p.Name, p.Price, p.Quantity)}
                                                    disabled={p.Quantity === 0}>
                                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                        <path d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25" stroke="" stroke-width="1.6" stroke-linecap="round" />
                                                    </svg> Buy
                                                </button>
                                            ) : (
                                                <button className="p-2 w-full min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50"
                                                    onClick={() => handleAddToCart(p.Name, p.Price, p.Quantity)}
                                                    disabled={p.Quantity === 0}>Out of Stock</button>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            ))}

                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }
}