import React from 'react'
import Logo from "../../UI/Logo";
import Sidebar from "../../Components/SidebarPatient";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import GetCart from "../getCart";

function PaymentCanceled() {
    const navigate = useNavigate();

    const [medicineName, setMedicineName] = useState();
    const [count, setCount] = useState(0);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                if (!reload) {

                    const res = await axios.put("http://localhost:3001/popOrder", { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });

                    console.log('Order deleted successfully:', res.data);

                    const result = await axios.get("http://localhost:3001/getcart", {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
                    });

                    console.log('Cart fetched successfully:', result.data);

                    if (Array.isArray(result.data.cart)) {
                        const CartData = result.data.cart;

                        // Reverse the quantities
                        await Promise.all(CartData.map(async (medicine) => {
                            const { medicineName, count } = medicine;
                            await axios.put("http://localhost:3001/reverseQuantity", {
                                Name: medicineName,
                                taken: count,
                            });
                        }));
                    } else {
                        console.error('Invalid data format received:', result.data.cart);
                    }
                    setReload(true);
                }
            } catch (error) {
                // Log the error details
                console.error('Error fetching cart data:', error);

                // If you want to handle the 404 error specifically
                if (error.response && error.response.status === 404) {
                    console.error('User not found');
                    // Redirect to an error page or handle appropriately
                }
            }
        }

        fetchData();
    }, []);

    const goToPaymentCanceled = () => {
        navigate('/PaymentCanceled');
    };


    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className='text-center mt-40'>
                <h1>Payment Canceled</h1>
                <h3 className='text-xl'>You can go back <a href="/ViewMedPatient">here</a>.</h3>
            </div>
        </div>
    )
}

export default PaymentCanceled