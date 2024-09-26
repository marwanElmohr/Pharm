const Prescriptions = require("../Models/Prescriptions.js");
const Patient = require("../Models/Patient.js");
const Doctor = require("../Models/Doctor.js");
const { default: mongoose } = require("mongoose");

const getPrescriptions = async (req, res) => {
    try {
        const patientName = req.query.Patient;
        const filter = { Patient: patientName };

        const prescriptions = await Prescriptions.find(filter);

        if (!prescriptions || prescriptions.length === 0) {
            console.log("Prescription not found for patient:", patientName);
            return res.status(404).send("Prescription not found for the specified patient.");
        }

        const allMedicines = prescriptions.flatMap(prescription => prescription.RequiredMedicines || []);
        const medicineNames = allMedicines.map((medicine) => medicine.name);

        res.status(200).send(medicineNames);
    } catch (e) {
        console.error("Error fetching prescription:", e);
        res.status(500).send("Internal Server Error");
    }
};

const getPrescriptionsDoctor = async (req, res) => {
    try {
        const doctorName = req.query.Doctor; // Avoid redeclaration
        const filter = { Doctor: doctorName };

        const prescriptions = await Prescriptions.find(filter);

        if (!prescriptions || prescriptions.length === 0) {
            console.log("Prescription not found for doctor:", doctorName);
            return res.status(404).send("Prescription not found for the specified doctor.");
        }

        const allMedicines = prescriptions.flatMap(prescription => prescription.RequiredMedicines || []);
        const medicineNames = allMedicines.map((medicine) => medicine.name);

        res.status(200).send(medicineNames);
    } catch (e) {
        console.error("Error fetching prescription:", e);
        res.status(500).send("Internal Server Error");
    }
};

const addPrescriptions = async (req, res) => {
    try {
        const { Doctor, Patient, RequiredMedicines, Notes } = req.body;
        const Status = "Unfilled";

        const newPrescription = new Prescriptions({
            Doctor,
            Patient,
            Status,
            Date: new Date(),
            Submitted: false,
            RequiredMedicines, 
            Notes,
        });

        await newPrescription.save();

        const medicineNames = RequiredMedicines.map((medicine) => medicine.name);
        res.status(200).send({ message: "Prescription added successfully", medicineNames });
    } catch (e) {
        console.error("Error adding prescription:", e);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getPrescriptions,
    getPrescriptionsDoctor,
    addPrescriptions,
};