import React, { useState, useEffect } from "react";
import '../Pages/Patient/Patient.scss';
import '../Pages/Admin/Admin.scss';
import '../Pages/Bootstrap.scss';
import Sidebar from "../Components/SidebarDoctor";
import {
    Typography,
    Button,
} from "@material-tailwind/react";
import axios from "axios";

export default function DoctorDashboard() {
    const [patientData, setPatientData] = useState([]);
    const [prescriptionData, setPrescriptionData] = useState([]);
    const [doctorData, setDoctorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const TABLE_HEADERS = [
        { id: 'name', title: 'Name' },
        { id: 'phoneNumber', title: 'Phone Number' },
        { id: 'email', title: 'Email' },
        { id: 'dob', title: 'Date of Birth' },
        { id: 'gender', title: 'Gender' },
    ];

    const PRES_HEADERS = [
        { id: 'doctorusername', title: 'Doctor Username' },
        { id: 'patientusername', title: 'Patient Username' },
        { id: 'status', title: 'Status' },
    ];

    // Define the data array
    const tableData = [
        {
            orderRef: 'CDD1049',
            customerName: 'John Doe',
            customerImage: 'trizzle-assets/images/avatar-men-circle-border.png',
            date: 'July 06, 2022',
            status: 'Pending',
            statusColor: 'bg-yellow-500',
        },
        {
            orderRef: 'CDD1050',
            customerName: 'Jane Smith',
            customerImage: 'trizzle-assets/images/avatar-women-circle-border.png',
            date: 'July 07, 2022',
            status: 'Delivered',
            statusColor: 'bg-green-500',
        },
        {
            orderRef: 'CDD1050',
            customerName: 'Jane Smith',
            customerImage: 'trizzle-assets/images/avatar-women-circle-border.png',
            date: 'July 07, 2022',
            status: 'Delivered',
            statusColor: 'bg-green-500',
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem('token')) {
                    setLoading(true);
                    const patientsResponse = await axios.get('http://localhost:3001/getPatientNames', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    });
                    setPatientData(patientsResponse.data);

                    const doctorResponse = await axios.get('http://localhost:3001/getOneDoctor', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    });
                    setDoctorData(doctorResponse.data);
                } else {
                    setError("No user found!");
                }
            } catch (error) {
                setError("There was an error fetching data!");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (doctorData) {
            const fetchPrescriptions = async () => {
                try {
                    const prescriptionsResponse = await axios.get('http://localhost:3001/getPrescriptionsDoctor', {
                        params: { Doctor: doctorData.Username }
                    });
                    setPrescriptionData(prescriptionsResponse.data);
                } catch (error) {
                    console.error("There was an error fetching prescriptions!", error);
                }
            };

            fetchPrescriptions();
        }
    }, [doctorData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="p-6">
                <h1 className="text-5xl text-black font-bold mt-8">Welcome, Dr. {doctorData.Name}</h1>
                <h2 className="text-lg text-gray-500 font-semibold mb-12">Patients and Prescriptions</h2>
                {/* Flex container for two tables side by side */}
                <div className="flex flex-wrap -mx-3">
                    {/* First table - My Patients */}
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h1 className="text-xl text-black font-semibold mb-4">My Patients</h1>
                            <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                                <table className="w-full min-w-max">
                                    <thead>
                                        <tr className="text-left">
                                            {TABLE_HEADERS.map((header, index) => (
                                                <th key={index} className="p-0">
                                                    <div
                                                        className={`py-3 px-6 ${index === 0
                                                            ? 'rounded-l-xl'
                                                            : index === TABLE_HEADERS.length - 1
                                                                ? 'rounded-r-xl'
                                                                : ''
                                                            } bg-gray-100`}
                                                    >
                                                        <span className="text-xs text-black font-semibold">
                                                            {header.title}
                                                        </span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patientData.map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <h5 className="text-sm font-medium text-gray-800">
                                                            {row.name}
                                                        </h5>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <span className="text-sm text-gray-800 font-medium">
                                                            {row.phoneNumber}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <span className="text-sm text-gray-800 font-medium">
                                                            {row.email}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <span className="text-sm text-gray-800 font-medium">
                                                            {new Date(row.DOB).toLocaleDateString('en-GB', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <span className="text-sm text-gray-800 font-medium">
                                                            {row.Gender}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination controls */}
                            <div className="flex items-center justify-between mt-4">
                                <Button variant="outlined" size="sm">
                                    Previous
                                </Button>
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    Page 1 of 10
                                </Typography>
                                <Button variant="outlined" size="sm">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Second table - My Prescriptions */}
                    <div className="w-full md:w-1/2 px-3">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h1 className="text-xl text-black font-semibold mb-4">My Prescriptions</h1>
                            <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                                <table className="w-full min-w-max">
                                    <thead>
                                        <tr className="text-left">
                                            {PRES_HEADERS.map((header, index) => (
                                                <th key={index} className="p-0">
                                                    <div
                                                        className={`py-3 px-6 ${index === 0
                                                            ? 'rounded-l-xl'
                                                            : index === TABLE_HEADERS.length - 1
                                                                ? 'rounded-r-xl'
                                                                : ''
                                                            } bg-gray-100`}
                                                    >
                                                        <span className="text-xs text-black font-semibold">
                                                            {header.title}
                                                        </span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescriptionData.map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <h5 className="text-sm font-medium text-gray-800">
                                                            {row.Doctor}
                                                        </h5>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <h5 className="text-sm font-medium text-gray-800">
                                                            {row.Patient}
                                                        </h5>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <span className="text-sm text-gray-800 font-medium">
                                                            {row.Status}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination controls */}
                            <div className="flex items-center justify-between mt-4">
                                <Button variant="outlined" size="sm">
                                    Previous
                                </Button>
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    Page 1 of 10
                                </Typography>
                                <Button variant="outlined" size="sm">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full-width table below */}
                <div className="mt-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h1 className="text-xl text-black font-semibold mb-4">Full-Width Table</h1>
                        <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                            <table className="w-full min-w-max">
                                <thead>
                                    <tr className="text-left">
                                        {TABLE_HEADERS.map((header, index) => (
                                            <th key={index} className="p-0">
                                                <div
                                                    className={`py-3 px-6 ${index === 0
                                                        ? 'rounded-l-xl'
                                                        : index === TABLE_HEADERS.length - 1
                                                            ? 'rounded-r-xl'
                                                            : ''
                                                        } bg-gray-100`}
                                                >
                                                    <span className="text-xs text-black font-semibold">
                                                        {header.title}
                                                    </span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {patientData.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="p-0">
                                                <div className={`h-16 p-6`}>
                                                    <h5 className="text-sm font-medium text-gray-800">
                                                        {row.name}
                                                    </h5>
                                                </div>
                                            </td>
                                            <td className="p-0">
                                                <div className={`h-16 p-6`}>
                                                    <h5 className="text-sm font-medium text-gray-800">
                                                        {row.phoneNumber}
                                                    </h5>
                                                </div>
                                            </td>
                                            <td className="p-0">
                                                <div className={`h-16 p-6`}>
                                                    <h5 className="text-sm font-medium text-gray-800">
                                                        {row.email}
                                                    </h5>
                                                </div>
                                            </td>
                                            <td className="p-0">
                                                <div className={`h-16 p-6`}>
                                                    <span className="text-sm text-gray-800 font-medium">
                                                        {new Date(row.DOB).toLocaleDateString('en-GB', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-0">
                                                <div className={`h-16 p-6`}>
                                                    <h5 className="text-sm font-medium text-gray-800">
                                                        {row.Gender}
                                                    </h5>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination controls */}
                        <div className="flex items-center justify-between mt-4">
                            <Button variant="outlined" size="sm">
                                Previous
                            </Button>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Page 1 of 10
                            </Typography>
                            <Button variant="outlined" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
