const AllMedicine = require("../Models/AllMedicine");
const { default: mongoose } = require("mongoose");

const addCategory = async (req, res) => {
    try {
        const { Name } = req.body;
        const Type = "Category";

        const existingCategory = await AllMedicine.findOne({ Name, Type });
        if (existingCategory) {
            return res.status(400).send("Category already exists");
        }

        await AllMedicine.create({
            Name,
            Type
        });

        res.status(200).send("Category created successfully");
    } catch (e) {
        console.error("Failed to create category", e);
        res.status(400).send("Failed to create category");
    }
};

const addSubcategory = async (req, res) => {
    try {
        const { Name, subcategory } = req.body;

        const medicine = await AllMedicine.findOne({ Name });

        if (!medicine) {
            return res.status(404).send("Category not found");
        }

        if (medicine.Subcategories.includes(subcategory)) {
            return res.status(400).send("Subcategory already exists");
        }

        medicine.Subcategories.push(subcategory);

        await medicine.save();

        res.status(200).send("Subcategory created successfully");
    } catch (e) {
        console.error("Failed to create subcategory", e);
        res.status(400).send("Failed to create subcategory");
    }
};

const addMedicinalUse = async (req, res) => {
    try {
        const { Name } = req.body;
        const Type = "MedicinalUse";

        const existingMedicinalUse = await AllMedicine.findOne({ Name, Type });
        if (existingMedicinalUse) {
            return res.status(400).send("Medicinal use already exists");
        }

        await AllMedicine.create({
            Name,
            Type
        });

        res.status(200).send("Medicinal use created successfully");
    } catch (e) {
        console.error("Failed to create medicinal use", e);
        res.status(400).send("Failed to create medicinal use");
    }
};

const addActiveIngredient = async (req, res) => {
    try {
        const { Name } = req.body;
        const Type = "ActiveIngredient";

        const existingActiveIngredient = await AllMedicine.findOne({ Name, Type });
        if (existingActiveIngredient) {
            return res.status(400).send("Active ingredient already exists");
        }

        await AllMedicine.create({
            Name,
            Type
        });

        res.status(200).send("Active ingredient created successfully");
    } catch (e) {
        console.error("Failed to create active ingredient", e);
        res.status(400).send("Failed to create active ingredient");
    }
};

// get subcategories for a specific category
const getName = async (req, res) => {
    try {
        const { Name } = req.query;
        
        const item = await AllMedicine.findOne({ Name }).select('Subcategories');

        if (!item) {
            return res.status(404).send("Item not found");
        }

        res.status(200).send(item);
    } catch (e) {
        console.error("Failed to get items", e);
        res.status(400).send("Failed to get items");
    }
};

// get categories, medicinal uses, or active ingredients
const getType = async (req, res) => {
    try {
        const { Type } = req.query;
        const items = await AllMedicine.find({ Type }).select('Name');
        res.status(200).send(items);
    } catch (e) {
        console.error("Failed to get items", e);
        res.status(400).send("Failed to get items");
    }
};

module.exports = {
    addCategory,
    addSubcategory,
    addMedicinalUse,
    addActiveIngredient,
    getName,
    getType,
};