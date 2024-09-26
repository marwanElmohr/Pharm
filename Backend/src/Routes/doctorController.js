const Doctor = require("../Models/Doctor.js");
const Patient = require("../Models/Patient.js");
const Admin = require("../Models/Admin.js");
const { default: mongoose, get } = require("mongoose");
var bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createDoctor = async (req, res) => {
  try {
    let doctorUsername = await Patient.findOne({ Username: req.body.Username });
    const doctorMail = await Patient.findOne({ Email: req.body.Email });
    const adminMail = await Admin.findOne({ Email: req.body.Email });
    if (!doctorUsername) {
      doctorUsername = await Admin.findOne({ Username: req.body.Username });
    }
    if (!doctorUsername && !doctorMail && !adminMail) {
      console.log(await hashPassword(req.body.Password));
      await Doctor.create({
        Username: req.body.Username,
        Password: await hashPassword(req.body.Password),
        Name: req.body.Name,
        Email: req.body.Email,
        Speciality: req.body.Speciality,
      });
      res.status(200).send("Created successfully");
    } else {
      if (doctorMail || adminMail) {
        res.status(401).send("e-mail already exists");
      } else {
        res.status(401).send("username already exists");
      }
    }
  } catch (e) {
    res.status(400).send("Failed to Create Doctor");
  }
};

const getPatientNames = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETA);
    const user = await Doctor.findById(decoded.userId);
    let Patients = user.Patients;
    const tmp = [];
    for (let i = 0; i < Patients.length; ++i) {
      tmp.push({
        name: Patients[i].patient.Name,
        username: Patients[i].patient.Username,
        phoneNumber: Patients[i].patient.phoneNumber,
        email: Patients[i].patient.Email,
        DOB: Patients[i].patient.DOB,
        Gender: Patients[i].patient.Gender,
      });
    }
    res.status(200).send(tmp);
  } catch (e) {
    res.status(400).send("Could not get patients");
  }
};

const getDoctors = async (req, res) => {
  try {
    const { Name, Speciality, Status } = req.query;
    const filter = {};
    if (Name) {
      filter.Name = Name;
    }
    if (Speciality) {
      filter.Speciality = Speciality;
    }
    if (Status) {
      filter.Status = Status;
    }
    const Doctors = await Doctor.find(filter);
    res.status(200).send(Doctors);
  } catch (e) {
    res.status(400).send("Error could not get Doctors !!");
  }
};

const updateDoctor = async (req, res) => {
  const user = req.body.Username;
  console.log(req.body.Username);
  if (req.body.Email) {
    await Doctor.updateOne(
      { Username: user },
      { $set: { Email: req.body.Email } },
    );
  }
  if (req.body.Hourlyrate) {
    await Doctor.updateOne(
      { Username: user },
      { $set: { Hourlyrate: req.body.Hourlyrate } },
    );
  }
  if (req.body.Affiliation) {
    await Doctor.updateOne(
      { Username: user },
      { $set: { Affiliation: req.body.Affiliation } },
    );
  }
  if (req.body.Status) {
    if (req.body.Status === "Rejected") {
      await Doctor.deleteOne({ Username: req.body.Username });
    } else {
      await Doctor.updateOne(
        { Username: user },
        { $set: { Status: req.body.Status } },
      );
    }
  }
  res.status(200).send("Done");
};

const findDoctor = async (req, res) => {
  console.log(req.query.Username);
  const doc = await Doctor.findOne({ Username: req.query.Username });
  res.status(200).send(doc);
};

const getOneDoctor = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRETA);
  const user = await Doctor.findById(decoded.userId);
  res.status(200).json(user);
};

module.exports = {
  createDoctor,
  getDoctors,
  updateDoctor,
  findDoctor,
  getPatientNames,
  getOneDoctor,
};