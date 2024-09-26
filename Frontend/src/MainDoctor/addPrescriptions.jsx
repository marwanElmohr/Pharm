import React, { useState, useEffect, useRef } from "react";
import Card from "../UI/Card";
import Sidebar from "../Components/SidebarDoctor";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function AddPrescriptions() {
    const patientRef = useRef();
    const notesRef = useRef();
    const [selectedMedicines, setSelectedMedicines] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [medicineList, setMedicineList] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [confirmsubmit, setConfirmsubmit] = useState(false);
    const [error, setError] = useState(""); // State for error messages

    useEffect(() => {
        const getPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getPatientNames', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setPatientData(response.data);
            } catch (error) {
                console.error("There was an error fetching the patients' data!", error);
            }
        }

        const getDoctor = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getOneDoctor', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setDoctor(response.data);
            } catch (error) {
                console.error("There was an error fetching the doctor's data!", error);
            }
        }

        const getMedicine = async () => {
            try {
                const res = await axios.get('http://localhost:3001/getMedicine');
                setMedicineList(res.data);
            } catch (error) {
                console.error('Error fetching medicines:', error);
            }
        };

        getPatients();
        getDoctor();
        getMedicine();
    }, []);

    const handleAddMedicine = (event) => {
        const selectedMedicineName = event.target.value;
        if (selectedMedicineName && !selectedMedicines.some(med => med.name === selectedMedicineName)) {
            setSelectedMedicines([...selectedMedicines, { name: selectedMedicineName, dose: 1 }]);
        }
        event.target.value = '';
    };

    const handleQuantityChange = (index, dose) => {
        const newSelectedMedicines = [...selectedMedicines];
        if (dose > 0) {
            newSelectedMedicines[index].dose = dose;
            setSelectedMedicines(newSelectedMedicines);
        }
    };

    const handleRemoveMedicine = (index) => {
        const newSelectedMedicines = selectedMedicines.filter((_, i) => i !== index);
        setSelectedMedicines(newSelectedMedicines);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setConfirmsubmit(true);
        setError("");

        const patientValue = patientRef.current.value;
        const notesValue = notesRef.current.value;
        const medicinesValue = selectedMedicines.map((medicine) => ({
            name: medicine.name,
            dose: medicine.dose,
        }));

        if (!patientValue) {
            setError("Please select a patient.");
            setConfirmsubmit(false);
            return;
        }
        if (medicinesValue.length === 0) {
            setError("Please select at least one medicine.");
            setConfirmsubmit(false);
            return;
        }

        try {
            await axios.post("http://localhost:3001/addPrescriptions", {
                Doctor: doctor.Name,
                Patient: patientValue,
                RequiredMedicines: medicinesValue,
                Notes: notesValue,
            });
            patientRef.current.value = '';
            notesRef.current.value = '';
            setSelectedMedicines([]);
            setTimeout(() => { setConfirmsubmit(false) }, 500);
            console.log("Update request sent successfully");
        } catch (error) {
            console.error("Error updating data:", error);
            setConfirmsubmit(false);
        }
    }

    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="my-20">
                <div className="items-center flex justify-center">
                    <Card width='w-10/12 xl:w-4/12'>
                        <div className="flex justify-center mt-6 mb-0">
                            <h1 className="text-2xl font-bold text-center text-sky-600 ml-0 mt-6">Add Prescription</h1>
                        </div >

                        <div className="flex justify-center mt-7">
                            <form onSubmit={submitHandler}>
                                <div className="mt-3">
                                    <div className="mb-4">
                                        <label className="text-xl font-bold font-SourceSansPro text-gray-500 ml-2">Patient Name:</label>
                                        <br />
                                        <select
                                            id="patientName"
                                            ref={patientRef}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="">Select a patient</option>
                                            {patientData.map((patient, index) => (
                                                <option key={index} value={patient.username}>
                                                    {patient.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-xl font-bold font-SourceSansPro text-gray-500 ml-2">Medicine:</label>
                                        <br />
                                        <select
                                            id="medicine"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                            onChange={handleAddMedicine}
                                        >
                                            <option value="">Select a medicine</option>
                                            {medicineList.map((medicine, index) => (
                                                <option key={index} value={medicine.Name}>
                                                    {medicine.Name}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedMedicines.length !== 0 &&
                                            <div className="mt-4">
                                                <label className="text-lg font-bold">Selected Medicines:</label>
                                                <ul className="list-disc pl-5">
                                                    {selectedMedicines.map((med, index) => (
                                                        <li key={index} className="flex items-center justify-between mb-2 p-2 rounded-md shadow">
                                                            <div className="flex items-center flex-grow">
                                                                <span className="mr-2">{med.name}</span>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    value={med.dose}
                                                                    onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                                                                    className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500 mr-2"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveMedicine(index)}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <FontAwesomeIcon icon={faXmark} />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-xl font-bold font-SourceSansPro text-gray-500 ml-2">Notes:</label>
                                        <br />
                                        <textarea
                                            id="notes"
                                            ref={notesRef}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 resize-none"
                                            placeholder="Enter your notes here..."
                                            style={{ overflowY: 'auto' }}
                                        ></textarea>
                                    </div>
                                    {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                                    <div className="flex justify-center mb-6">
                                        <button className={`outline w-40 h-9 rounded-md shadow ${confirmsubmit ? 'text-white bg-gray-600' : 'text-sky-600'}`} disabled={confirmsubmit}>
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AddPrescriptions;