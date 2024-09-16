const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allmedicineSchema = new Schema(
    {
        Name: {
            type: String,
            required: true,
        }, 
        Type: {
            type: String,
            required: true,
        },
        Subcategories: {
            type: Array,
        }
    },
    { timestamps: true }
);

const AllMedicine = mongoose.model("allmedicine", allmedicineSchema);
module.exports = AllMedicine;