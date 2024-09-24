import React from "react";
import Sidebar from "./SidebarHome";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faBasketShopping
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

export default function MedicineCategory() {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const medicine = query.get('medicine');

    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="footer px-32 container-fluid">
                <Card className="flex flex-row">
                    <div className="w-1/2 border-r p-12">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                alt="ui/ux review check"
                            />
                        </CardHeader>
                    </div>
                    <div className="w-1/2 flex flex-col px-40">
                        <div className="flex justify-center">
                            <CardBody>
                                <Typography variant="h4" color="blue-gray" vl>
                                    UI/UX Review Check
                                </Typography>
                            </CardBody>
                        </div>
                        <div className="flex justify-end">
                            <label className="font-bold ">$</label><label><a>122</a></label>
                        </div>
                        <div className="flex justify-center">
                            <a>
                                <button className="justify-end bg-sky-600 text-white w-80 h-10 rounded-md mb-2 mt-0.5">
                                    <FontAwesomeIcon icon={faBasketShopping} /> Add to Cart
                                </button>
                            </a>
                        </div>
                    </div>
                </Card>
            </div>
            <Footer />
        </div>
    );
}