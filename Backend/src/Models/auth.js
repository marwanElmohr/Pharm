var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const Admin = require("./Admin.js")
const Pharmacist = require("./Pharmacist.js");
const Patient = require("./Patient.js");
const Doctor = require("./Doctor.js");
const hashPassword = async (password) => {
    return bcrypt.hash(password, 5);
};
const { default: mongoose } = require("mongoose");

const comparePassword = async (password, hash) => {
    try {
        return bcrypt.compare(password, hash);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};

const protectP = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        console.log("not authorized");
        res.json({ message: "not authorized" });
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        console.log("not valid token");
        res.json({ message: "not valid token" });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRETP);
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401);
        res.json({ message: "not valid token" });
        return;
    }
};

const protectPH = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        console.log("not authorized");
        res.json({ message: "not authorized" });
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        console.log("not valid token");
        res.json({ message: "not valid token" });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRETD);
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401);
        res.json({ message: "not valid token" });
        return;
    }
};

const protectA = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        console.log("not authorized");
        res.json({ message: "not authorized" });
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        console.log("not valid token");
        res.json({ message: "not valid token" });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRETA);
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401);
        res.json({ message: "not valid token" });
        return;
    }
};

const signin = async (req, res) => {
    const username = req.body.Username;
    const password = req.body.Password;

    let user = await Patient.findOne({ Username: username });

    let isValid;
    if (user) {
        isValid = await comparePassword(password, user.Password);
        if (isValid) {
            return res.status(200).send({
                type: "Patient",
                token: jwt.sign({ userId: user._id }, process.env.JWT_SECRETP),
            });
        } else {
            return res.status(401).send("Invalid password");
        }
    } else {
        user = await Pharmacist.findOne({ Username: username });
        if (user) {
            isValid = await comparePassword(password, user.Password);
            if (isValid) {
                res.status(200).send({
                    type: "Pharmacist",
                    token: jwt.sign({ userId: user._id }, process.env.JWT_SECRETPH),
                });
            } else {
                res.status(401).send("Invalid password");
            }
        } else {
            user = await Admin.findOne({ Username: username });
            if (user) {
                isValid = await comparePassword(password, user.Password);
                if (isValid) {
                    res.status(200).send({
                        type: "Admin",
                        token: jwt.sign({ userId: user._id }, process.env.JWT_SECRETA),
                    });
                } else {
                    res.status(401).send("Invalid password");
                }
            } else {
                user = await Doctor.findOne({ Username: username });
                if (user) {
                    isValid = await comparePassword(password, user.Password);
                    if (isValid) {
                        res.status(200).send({
                            type: "Doctor",
                            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRETA),
                        });
                    } else {
                        res.status(401).send("Invalid Password");
                    }
                } else {
                    res.status(401).send("User not found");
                }
            }
        }
    }
};

const changePassword = async (req, res) => {
    let username = req.body.Username;
    let password = req.body.Password;
    let confirm = req.body.confirmPassword;

    if (password == confirm) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;
        if (passwordRegex.test(password)) {
            let user = await Patient.findOne({ Username: username });
            if (user) {
                await Patient.updateOne({ Username: username }, { $set: { Password: await hashPassword(password) } });
                res.status(200).send("Patient password successfully updated");
                return;
            } else {
                user = await Pharmacist.findOne({ Username: username });
                if (user) {
                    await Pharmacist.updateOne({ Username: username }, { $set: { Password: await hashPassword(password) } });
                    res.status(200).send("Pharmacist password successfully updated");
                    return;
                } else {
                    user = await Admin.findOne({ Username: username });
                    if (user) {
                        await Admin.updateOne({ Username: username }, { $set: { Password: await hashPassword(password) } });
                        res.status(200).send("Admin password successfully updated");
                        return;
                    } else {
                        res.status(200).send("User not found");
                        return;
                    }
                }
            }
        } else {
            res.status(200).send("Password must have at least 3 characters, including 1 uppercase letter, 1 lowercase letter, and 1 digit.");
            return;
        }
    } else {
        res.status(200).send("Passwords don't match");
        return;
    }
}

module.exports = {
    signin,
    comparePassword,
    protectA,
    protectPH,
    protectP,
    changePassword,
};