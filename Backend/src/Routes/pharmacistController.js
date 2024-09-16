const Pharmacist = require("../Models/Pharmacist");
const Admin = require("../Models/Admin");
const Patient = require("../Models/Patient");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createPharmacist = async (req, res) => {

  try {
    let adminUsername = await Admin.findOne({ Username: req.body.Username });
    let patientUsername = await Patient.findOne({ Username: req.body.Username });
    let adminEmail = await Admin.findOne({ Email: req.body.Email });
    let patientEmail = await Patient.findOne({ Email: req.body.Email });

    if (adminUsername || patientUsername) {
      res.status(401).send("Username already exists");
    } else if (adminEmail || patientEmail) {
      res.status(401).send("Email already exists");
    } else {
      await Pharmacist.create({
        Username: req.body.Username,
        Password: await hashPassword(req.body.Password),
        Name: req.body.Name,
        Email: req.body.Email
      });
      res.status(200).send("Created successfully");
    }
  } catch (e) {
    res.status(400).send("Failed to Create Pharmacist");
  }
};

const getPharmacists = async (req, res) => {
  try {
    const Pharmacists = await Pharmacist.find();
    res.status(200).send(Pharmacists);
  } catch (e) {
    res.status(400).send("Error could not get Pharmacists !!");
  }
};

const updatePharmacist = async (req, res) => {
  try {
    const user = req.body.Username;
    if (req.body.Email) {
      await Pharmacist.updateOne(
        { Username: user },
        { $set: { Email: req.body.Email } }
      );
    }
    if (req.body.Hourlyrate) {
      await Pharmacist.updateOne(
        { Username: user },
        { $set: { Hourlyrate: req.body.Hourlyrate } }
      );
    }
    if (req.body.Affiliation) {
      await Pharmacist.updateOne(
        { Username: user },
        { $set: { Affiliation: req.body.Affiliation } }
      );
    }
    if (req.body.ReqStatus) {
      if (req.body.ReqStatus === "Rejected") {
        await Pharmacist.deleteOne({ Username: req.body.Username });
      } else {
        await Pharmacist.updateOne(
          { Username: user },
          { $set: { ReqStatus: req.body.ReqStatus } }
        );
      }
    }
    res.status(200).send("Updated Successfully");
  } catch (e) {
    res.status(400).send("Error could not update package !!");
  }
};

const findPharmacist = async (req, res) => {
  if (
    (await Pharmacist.findOne({ Username: req.body.Username }).length) === 0
  ) {
    res.status(300).send("User Not Found");
  } else {
    const Pharmacist = await Pharmacist.findOne({
      Username: req.body.Username,
    });
    res.status(200).send({ data: Pharmacist });
  }
};

const deletePharmacist = async (req, res) => {
  //delete a Doctor from the database
  try {
    if ((await Pharmacist.find({ Username: req.body.Username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Pharmacist.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete Pharmacist !!");
  }
};

const getOnePharmacist = async (req, res) => {
  const username = req.query.username;
  const user = await Pharmacist.findOne({ Username: username });
  res.status(200).json(user);
};

const notifyOutOfStock = async (req, res) => {
  try {
    const users = await Pharmacist.find({ ReqStatus: "Accepted" });

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(users.map(async (user) => {
      let notification = user.Notifications || [];
      notification.push(req.body.notifications);
      await Pharmacist.updateOne(
        { Username: user.Username },
        { $set: { Notifications: notification } },
      );
    }));

    res.status(200).send("Updated successfully");
  } catch (error) {
    res.status(400).send("Error: Could not update Pharmacist!!");
  }
};

module.exports = {
  createPharmacist,
  getPharmacists,
  updatePharmacist,
  deletePharmacist,
  findPharmacist,
  getOnePharmacist,
  notifyOutOfStock,
};