const Admin = require("../Models/Admin");
const Pharmacist = require("../Models/Pharmacist");
const Patient = require("../Models/Patient");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createAdmin = async (req, res) => {
  try {
    let pharmacistUsername = await Admin.findOne({ Username: req.body.Username });
    let patientUsername = await Patient.findOne({ Username: req.body.Username });
    let pharmacistEmail = await Admin.findOne({ Email: req.body.Email });
    let patientEmail = await Patient.findOne({ Email: req.body.Email });

    if (patientUsername || pharmacistUsername) {
      res.status(401).send("Username already exists");
    } else if (patientEmail || pharmacistEmail) {
      res.status(401).send("Email already exists");
    } else {
      await Admin.create({
        Username: req.body.Username,
        Password: await hashPassword(req.body.Password),
        Email: req.body.Email,
      });
      res.status(200).send("Created successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not create Admin !!");
  }
};

const getAdmins = async (req, res) => {
  try {
    const Admins = await Admin.find();
    res.status(200).send(Admins);
  } catch (e) {
    res.status(400).send("Error could not get Admins !!");
  }
};

const updateAdmin = async (req, res) => {
  try {
    const username = req.body.Username;
    const email = req.body.Email;

    let pharmacistEmail = await Admin.findOne({ Email: req.body.Email });
    let patientEmail = await Patient.findOne({ Email: req.body.Email });
    if ((await Admin.find({ Username: username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      if (pharmacistEmail || patientEmail) {
        await Admin.updateOne({ Username: username }, { $set: { Email: email } });
        res.status(200).send("Email updated successfully");
      } else {
        res.status(401).send("Email already exists");
      }
    }
  } catch (e) {
    res.status(400).send("Error could not update email !!");
  }
};

const deleteAdmin = async (req, res) => {
  try {
    if ((await Admin.find({ Username: req.body.Username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Admin.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete Admin !!");
  }
};

const getOneAdmin = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRETA);
  const user = await Admin.findById(decoded.userId);
  res.status(200).json(user);
};

module.exports = { createAdmin, getAdmins, updateAdmin, deleteAdmin, getOneAdmin };