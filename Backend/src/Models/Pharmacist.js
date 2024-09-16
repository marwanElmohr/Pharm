const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema(
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
    
    Notifications: {
      type: Array,
      required: false,
    }
  },
  { timestamps: true }
);

const Pharmacist = mongoose.model("pharmacist", pharmacistSchema);
module.exports = Pharmacist;
