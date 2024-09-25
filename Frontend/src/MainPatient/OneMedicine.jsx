import React, { useState, useEffect } from "react";
import Sidebar from "./SidebarHome";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBasketShopping,
    faCirclePlus,
    faCircleMinus
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

export default function MedicineCategory() {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    // const medicineId = query.get('medicine');
    const medicineId = "Sublocade";
    const [medicineData, setMedicineData] = useState({
        Name: '',
        Description: '',
        Quantity: 0,
        Price: 0,
        Picture: ''
    });
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const incrementQuantity = () => {
        if (quantity < medicineData.Quantity) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1 && medicineData.Quantity > 0) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleAddToCart = async () => {
        if (localStorage.getItem("type") === "Patient") {
            try {
                if (medicineData.Quantity > 0) {
                    setAddedToCart(true);

                    axios.put("http://localhost:3001/updatePatient", {
                        medicinename: medicineData.Name,
                        quantity: quantity,
                        price: medicineData.Price,
                    }, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }, });
                    console.log("Update request sent successfully");

                    setTimeout(() => { setAddedToCart(false) }, 500);

                } else {
                    console.log("Cannot add to cart. Insufficient quantity.");
                }
            } catch (error) {
                console.error("Error updating data:", error);
            }
        } else {
            window.location.href = "/login";
        }
    };

    useEffect(() => {
        if (medicineId) {
            axios.get(`http://localhost:3001/getOneMedicine?medicinename=${medicineId}`)
                .then((response) => {
                    const { Name, Description, Quantity, Price, Picture } = response.data;
                    console.log(response.data);
                    setMedicineData({ Name, Description, Quantity, Price, Picture });
                })
                .catch((error) => {
                    console.error("There was an error fetching the medicine data!", error);
                });
        }
    }, []);

    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="footer px-32 py-12 container-fluid border-b">
                <Card className="flex flex-row shadow-md" style={{ boxShadow: '0 -1px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)' }}>
                    <div className="w-1/2 border-r flex justify-center items-center">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none py-12"
                        >
                            <img
                                src={medicineData.Picture}
                                alt={medicineData.Name}
                            />
                        </CardHeader>
                    </div>
                    <div className="w-1/2 flex flex-col px-40">
                        <div className="flex-grow">
                            <div className="flex justify-center">
                                <CardBody className="flex-grow">
                                    <h3 color="blue-gray" className="font-bold text-center text-4xl pt-6">
                                        {medicineData.Name}
                                    </h3>
                                    <p className="text-sm my-5">
                                        {medicineData.Description}
                                    </p>
                                </CardBody>
                            </div>
                            <div className="flex justify-end text-xl">
                                <label className="font-bold">$</label><label><a>{medicineData.Price}</a></label>
                            </div>
                        </div>
                        <div className="flex justify-center border-t flex flex-col mt-auto mb-12">
                            <div className="flex flex-row w-full py-4 pl-2 justify-between items-center">
                                <button className={`w-8 h-8 ${quantity === 1 ? 'text-gray-400' : 'text-black'}`} onClick={decrementQuantity} disabled={quantity === 1}>
                                    <FontAwesomeIcon icon={faCircleMinus} />
                                </button>
                                <label className="text-grey text-xl text-center"> {quantity} </label>
                                <button className={`w-8 h-8 ${quantity >= medicineData.Quantity ? 'text-gray-400' : 'text-black'}`} onClick={incrementQuantity} disabled={quantity >= medicineData.Quantity}>
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </button>
                            </div>
                            <div>
                                <a>
                                    <button className={`justify-end text-white w-80 h-10 rounded-md mb-2 mt-0.5 ${addedToCart ? 'bg-gray-600' : 'bg-sky-600'}`} onClick={() => handleAddToCart()} disabled={addedToCart}>
                                        <FontAwesomeIcon icon={faBasketShopping} /> Add to Cart
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <Footer />
        </div>
    );
}