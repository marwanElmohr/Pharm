const Patient = require("../Models/Patient.js");
const Admin = require("../Models/Admin.js");
const Pharmacist = require("../Models/Pharmacist.js");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createPatient = async (req, res) => {
  let adminUsername = await Admin.findOne({ Username: req.body.Username });
  let pharmacistUsername = await Pharmacist.findOne({ Username: req.body.Username });
  let adminEmail = await Admin.findOne({ Email: req.body.Email });
  let pharmacistEmail = await Pharmacist.findOne({ Email: req.body.Email });

  const wallet = 1000;
  if (adminUsername || pharmacistUsername) {
    res.status(401).send("Username already exists");
  } else if (adminEmail || pharmacistEmail) {
    res.status(401).send("Email already exists");
  } else {
    if (req.body.EmergencyContact) {
      await Patient.create({
        Username: req.body.Username,
        Password: await hashPassword(req.body.Password),
        Gender: req.body.Gender,
        Name: req.body.Name,
        Email: req.body.Email,
        phoneNumber: req.body.phoneNumber,
        DOB: req.body.DOB,
        Wallet: wallet,
        EmergencyContact: {
          FullnameEC: req.body.EmergencyContact.FullnameEC,
          phoneNumberEC: req.body.EmergencyContact.phoneNumberEC,
          Relations: req.body.EmergencyContact.Relations,
        },
      });
    } else {
      await Patient.create({
        Username: req.body.Username,
        Password: await hashPassword(req.body.Password),
        Gender: req.body.Gender,
        Name: req.body.Name,
        Email: req.body.Email,
        phoneNumber: req.body.phoneNumber,
        DOB: req.body.DOB,
        Wallet: wallet,
      });
    }
    res.status(200).send("Created successfully");
  }
};

const getCart = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRETP);
  const user = await Patient.findById(decoded.userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  let cart = [];
  if (user.Cart) {
    cart = user.Cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
  }

  res.status(200).send({ cart });
};

const getPatients = async (req, res) => {
  try {
    const Patients = await Patient.find();
    res.status(200).send(Patients);
  } catch (e) {
    res.status(400).send("Error could not get Patients !!");
  }
};

const updatePatient = async (req, res) => {
  try {
    const orderName = req.body.medicinename;
    const orderQuantity = req.body.quantity;
    const orderPrice = req.body.price;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETP);
    const user = await Patient.findById(decoded.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    let cart = user.Cart || [];
    const existingCartItemIndex = cart.findIndex(
      (item) => item.medicineName === orderName
    );
    if (existingCartItemIndex !== -1) {
      cart[existingCartItemIndex].count += orderQuantity;
      cart[existingCartItemIndex].price = orderPrice;
      cart[existingCartItemIndex].totalprice =
        orderPrice * cart[existingCartItemIndex].count;
    } else {
      cart.push({
        medicineName: orderName,
        count: orderQuantity,
        price: orderPrice,
        totalprice: orderPrice,
      });
    }
    await Patient.updateOne({ Username: user.Username }, { $set: { Cart: cart } });
    res.status(200).send("Updated cart successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not update Patient!!");
  }
};

const incrementQuantity = async (req, res) => {
  try {
    const orderName = req.body.medicinename;
    const orderPrice = req.body.price;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETP);
    const user = await Patient.findById(decoded.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    let cart = user.Cart || [];
    const existingMedicineIndex = cart.findIndex(
      (item) => item.medicineName === orderName
    );

    if (existingMedicineIndex !== -1) {
      cart[existingMedicineIndex].count += 1;
      cart[existingMedicineIndex].totalprice += orderPrice;
    } else {
      return res.status(404).send("Medicine not found in the cart");
    }

    await Patient.updateOne({ Username: user.Username }, { $set: { Cart: cart } });
    res.status(200).send("Incremented quantity successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not increment quantity");
  }
};

const decrementQuantity = async (req, res) => {
  try {
    const orderName = req.body.medicinename;
    const orderPrice = req.body.price;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETP);
    const user = await Patient.findById(decoded.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    let cart = user.Cart || [];
    const existingMedicineIndex = cart.findIndex(
      (item) => item.medicineName === orderName
    );

    if (existingMedicineIndex !== -1) {
      if (cart[existingMedicineIndex].count > 1) {
        cart[existingMedicineIndex].count -= 1;
        cart[existingMedicineIndex].totalprice -= orderPrice;
      } else {
        cart.splice(existingMedicineIndex, 1);
      }
    } else {
      return res.status(404).send("Medicine not found in the cart");
    }

    await Patient.updateOne({ Username: user.Username }, { $set: { Cart: cart } });
    res.status(200).send("Decremented quantity successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not decrement quantity");
  }
};

const removeFromCart = async (req, res) => {
  try {
    const orderName = req.body.medicinename;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETP);
    const user = await Patient.findById(decoded.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }
    let cart = user.Cart || [];
    const existingMedicineIndex = cart.findIndex(
      (item) => item.medicineName === orderName
    );

    if (existingMedicineIndex !== -1) {
      cart.splice(existingMedicineIndex, 1);
    } else {
      return res.status(404).send("Medicine not found in the cart");
    }
    await Patient.updateOne({ Username: user.Username }, { $set: { Cart: cart } });
    res.status(200).send("Decremented quantity successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not remove medicine");
  }
};

const updateAddress = async (req, res) => {
  try {
    const state = req.body.state;
    const city = req.body.city;
    const street = req.body.street;
    const apartment = req.body.apartment;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETP);
    const user = await Patient.findById(decoded.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    let address = user.Address;
    address.push({
      state: state,
      city: city,
      street: street,
      apartment: apartment,
    });
    await Patient.updateOne(
      { Username: user.Username },
      { $set: { Address: address } }
    );
    res.status(200).send("Updated address successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not update Patient's address!!");
  }
};

const getAddress = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRETP);
  const user = await Patient.findById(decoded.userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  let address = [];
  if (user.Address) {
    address = user.Address;
  }
  res.status(200).send(address);
};

const deletePatient = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETP);
    const user = await Patient.findById(decoded.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    await Patient.deleteOne({ Username: user.Username });
    res.status(200).send("Deleted successfully");
  } catch (e) {
    res.status(400).send("Error could not delete patient !!");
  }
};

const getOrder = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return res.status(404).send("User not found");
  const decoded = jwt.verify(token, process.env.JWT_SECRETP);
  const user = await Patient.findById(decoded.userId);
  let orders = [];
  if (user.Orders) {
    orders = user.Orders;
  }
  return res.status(200).send(orders);
};

const addOrder = async (req, res) => {
  try {
    const orderAddress = req.body.orderaddress;
    const paymentMethod = req.body.paymentmethod;
    const orderStatus = "Accepted";
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETP);
    const user = await Patient.findById(decoded.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    let wallet = user.Wallet;
    let order = user.Orders || [];
    let orderid = order.length;
    order.push({
      orderid,
      cartItems: [...user.Cart],
      orderAddress,
      paymentMethod,
      orderStatus,
    });
    let sales = user.Sales || [];
    let salesid = sales.length;
    for (let i = 0; i < user.Cart.length; i++) {
      salesid = sales.length;
      sales.push({
        salesid,
        medicineName: user.Cart[i].medicineName,
        quantity: user.Cart[i].count,
        price: user.Cart[i].totalprice,
        date: req.body.date,
        month: req.body.month,
        orderid,
      });
    }
    const totalpricepaid = user.Cart.reduce(
      (acc, item) => acc + item.totalprice,
      0
    );
    if (wallet >= totalpricepaid && paymentMethod == "Wallet") {
      wallet -= totalpricepaid;
    }
    user.Cart = [];
    await Patient.updateOne(
      { Username: user.Username },
      { $set: { Orders: order, Sales: sales, Cart: [], Wallet: wallet } }
    );
    res.status(200).send("Added order successfully!");
  } catch (e) {
    res.status(400).send("Error could not add order !!");
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderid = req.body.orderid;
    const totalprice = req.body.totalprice;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETP);
    const user = await Patient.findById(decoded.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const wallet = user.Wallet;
    let sales = user.Sales || [];
    let order = user.Orders || [];
    const existingOrderIndex = order.findIndex(
      (item) => item.orderid === orderid
    );
    if (existingOrderIndex !== -1) {
      sales = sales.filter(item => item.orderid !== orderid);
      order[existingOrderIndex].orderStatus = "Cancelled";
      await Patient.updateOne(
        { Username: user.Username },
        { $set: { Orders: order, Sales: sales, Wallet: (wallet + totalprice) } }
      );
    } else {
      res.status(400).send("Order not found");
    }
    res.status(200).send("Order status changed successfully!");
  } catch (e) {
    res.status(400).send("Error could not change order status !!");
  }
};

const popOrder = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETP);
    const user = await Patient.findById(decoded.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    let sales = user.Sales || [];
    let order = user.Orders || [];
    const existingOrderIndex = order.length - 1;

    if (existingOrderIndex >= 0) {
      const canceledOrder = order[existingOrderIndex];
      sales = sales.filter(item => item.orderid !== canceledOrder);
      const cart = user.Cart || [];

      canceledOrder.cartItems.forEach((item) => {
        const existingCartItemIndex = cart.findIndex(
          (cartItem) => cartItem.medicineName === item.medicineName
        );

        if (existingCartItemIndex !== -1) {
          cart[existingCartItemIndex].count += item.count;
          cart[existingCartItemIndex].totalprice += item.totalprice;
        } else {
          cart.push({ ...item });
        }
      });

      order.pop();

      await Patient.updateOne(
        { Username: user.Username },
        { $set: { Orders: order, Sales: sales, Cart: cart } }
      );
      res.status(200).send("Order status changed successfully!");
    } else {
      res.status(404).send("No order found to pop");
    }
  } catch (e) {
    res.status(400).send("Error could not change order status !!");
  }
};

const getWallet = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRETP);
  const user = await Patient.findById(decoded.userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  wallet = user.Wallet;
  res.status(200).json(wallet);
};

const getSales = async (req, res) => {
  try {
    const users = await Patient.find();
    let sales = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < users[i].Sales.length; j++) {
        sales.push(users[i].Sales[j]);
      }
    }

    let selected = req.query.month;
    if (selected !== '')
      sales = sales.filter(item => item.month == selected);

    let name = req.query.medicinename;
    if (name !== '')
      sales = sales.filter(item => item.medicineName == name);

    let date = req.query.dateoffilter;
    if (date !== '')
      sales = sales.filter(item => item.date == date);

    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const ResetPass = async (req, res) => {
  const newPassword = req.body.Password;
  const email = req.body.Email;
  console.log(email);
  let user = await Pharmacist.findOne({ Email: email });
  if (user) {
    await Pharmacist.updateOne(
      { Email: email, ReqStatus: "Accepted" },
      { $set: { Password: await hashPassword(newPassword) } }
    ).catch("An error happened");
    res.status(200).send("all good");
    return;
  } else {
    user = await Patient.findOne({ Email: email });
    if (user) {
      await Patient.updateOne(
        { Email: email },
        { $set: { Password: await hashPassword(newPassword) } }
      ).catch("An error happened");
      res.status(200).send("all good");
      return;
    } else {
      user = await Admin.findOne({ Email: email });
      if (user) {
        await Admin.updateOne(
          { Email: email },
          { $set: { Password: await hashPassword(newPassword) } }
        ).catch("An error happened");
        res.status(200).send("all good");
        return;
      } else {
        res.status(200).send("Email not found");
        return;
      }
    }
  }
  res.status(200).send("all good");
};

const getOnePatient = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(404).send("User not found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETP);

    const user = await Patient.findById(decoded.userId).select('Username Email phoneNumber');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ username: user.Username, email: user.Email, phoneNumber: user.phoneNumber });
  } catch (error) {
    console.error('Error processing user name:', error);
    res.status(500).json({ message: 'jwt expired' });
  }
};

module.exports = {
  createPatient,
  getPatients,
  updatePatient,
  getCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updateAddress,
  getAddress,
  deletePatient,
  getOrder,
  addOrder,
  cancelOrder,
  popOrder,
  getWallet,
  getSales,
  ResetPass,
  getOnePatient,
};
