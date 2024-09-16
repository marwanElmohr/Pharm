const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },

    Password: {
      type: String,
      required: true,
    },

    Name: {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
      unique: true,
    },

    Patients: {
      type: Array,
      required: false,
    },

    Speciality: {
      type: String, 
      required: true
    },
  },
  { timestamps: true },
);

const Doctor = mongoose.model("doctor", doctorSchema);
module.exports = Doctor;