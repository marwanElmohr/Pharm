import React, { useState } from "react";

const Burger = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative bg-white">
            <div className="container flex justify-between items-center p-4">
                {/* Burger Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="text-blue-500 z-50 relative"
                >
                    <div className="w-6 h-6 relative">
                        {!open ? (
                            // Burger Icon
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        ) : (
                            // X Icon when menu is open
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </div>
                </button>
            </div>

            {/* Menu */}
            {open && (
                <div className="absolute top-18 left-0 bg-[#FFFFFF]  w-60 h-auto shadow-lg z-40 rounded-lg">
                    <ul>
                        <li className="py-2">
                            <a className="text-black-500" href="/MedicineCategory">
                                Category 1
                            </a>
                        </li>
                        <li className="py-2">
                            <a className="text-black-500" href="/MedicineCategory">
                                Category 2
                            </a>
                        </li>
                        <li className="py-2">
                            <a className="text-black-500" href="/MedicineCategory">
                                Category 3
                            </a>
                        </li>
                        <li className="py-2">
                            <a className="text-black-500" href="/MedicineCategory">
                                Category 4
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Burger;
