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
        Price: 0,
        Picture: ''
    });

    useEffect(() => {
        if (medicineId) {
            axios.get(`http://localhost:3001/getOneMedicine?medicinename=${medicineId}`)
                .then((response) => {
                    const { Name, Description, Price, Picture } = response.data;
                    console.log(response.data);
                    setMedicineData({ Name, Description, Price, Picture });
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
                            <div className="flex flex-row w-full py-4">
                                <button className="justify-end w-4 h-4 pl-5">
                                    <FontAwesomeIcon icon={faCircleMinus} />
                                </button>
                                <label className="text-grey px-32 text-xl"> {3} </label>
                                <button className="justify-end w-4 h-4 pr-5'">
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </button>
                            </div>
                            <div>
                                <a>
                                    <button className="justify-end bg-sky-600 text-white w-80 h-10 rounded-md mb-2 mt-0.5">
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