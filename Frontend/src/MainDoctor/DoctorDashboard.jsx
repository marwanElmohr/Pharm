import React from "react";
import '../Pages/Patient/Patient.scss';
import '../Pages/Admin/Admin.scss';
import '../Pages/Bootstrap.scss';
import Sidebar from "../MainPatient/SidebarHome";
import {
    Typography,
    Button,
} from "@material-tailwind/react";

export default function DoctorDashboard() {

    // Define the table headers
    const TABLE_HEADERS = [
        { id: 'orderRef', title: 'ORDER REF' },
        { id: 'customer', title: 'CUSTOMER' },
        { id: 'date', title: 'DATE' },
        { id: 'status', title: 'STATUS' },
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

    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="p-6">
                <h1 className="text-5xl text-black font-bold mt-8">Welcome, Dr. El-Gayar</h1>
                <h2 className="text-lg text-gray-500 font-semibold mb-12">Lorem ipsum wkdvvmicvememrimvdvmr </h2>
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
                                        {tableData.map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <h5 className="text-sm font-medium text-gray-800">
                                                            {row.orderRef}
                                                        </h5>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <div className="flex h-full items-center">
                                                            <img
                                                                className="w-8 h-8 mr-3 rounded-full object-cover"
                                                                src={row.customerImage}
                                                                alt={row.customerName}
                                                            />
                                                            <span className="text-sm font-medium text-gray-800">
                                                                {row.customerName}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <span className="text-sm text-gray-800 font-medium">
                                                            {row.date}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`flex h-16 p-6 items-center`}>
                                                        <span
                                                            className={`inline-block w-2 h-2 mr-1 rounded-full ${row.statusColor}`}
                                                        ></span>
                                                        <span className="text-sm font-medium text-gray-800">
                                                            {row.status}
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
                                        {tableData.map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <h5 className="text-sm font-medium text-gray-800">
                                                            {row.orderRef}
                                                        </h5>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <div className="flex h-full items-center">
                                                            <img
                                                                className="w-8 h-8 mr-3 rounded-full object-cover"
                                                                src={row.customerImage}
                                                                alt={row.customerName}
                                                            />
                                                            <span className="text-sm font-medium text-gray-800">
                                                                {row.customerName}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`h-16 p-6`}>
                                                        <span className="text-sm text-gray-800 font-medium">
                                                            {row.date}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-0">
                                                    <div className={`flex h-16 p-6 items-center`}>
                                                        <span
                                                            className={`inline-block w-2 h-2 mr-1 rounded-full ${row.statusColor}`}
                                                        ></span>
                                                        <span className="text-sm font-medium text-gray-800">
                                                            {row.status}
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
                                    {tableData.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="p-0">
                                                <div className={`h-16 p-6`}>
                                                    <h5 className="text-sm font-medium text-gray-800">
                                                        {row.orderRef}
                                                    </h5>
                                                </div>
                                            </td>
                                            <td className="p-0">
                                                <div className={`h-16 p-6`}>
                                                    <div className="flex h-full items-center">
                                                        <img
                                                            className="w-8 h-8 mr-3 rounded-full object-cover"
                                                            src={row.customerImage}
                                                            alt={row.customerName}
                                                        />
                                                        <span className="text-sm font-medium text-gray-800">
                                                            {row.customerName}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-0">
                                                <div className={`h-16 p-6`}>
                                                    <span className="text-sm text-gray-800 font-medium">
                                                        {row.date}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-0">
                                                <div className={`flex h-16 p-6 items-center`}>
                                                    <span
                                                        className={`inline-block w-2 h-2 mr-1 rounded-full ${row.statusColor}`}
                                                    ></span>
                                                    <span className="text-sm font-medium text-gray-800">
                                                        {row.status}
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
        </div>
    );
}
