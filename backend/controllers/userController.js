const bcrypt = require ('bcrypt');
const UserModel = require ('../models/userModel');
const saltRounds = 10;
const nodemailer = require ('nodemailer');
var jwt = require ('jsonwebtoken');
let BorrowModel = require("../models/borrowModel")
// sign up
let signUp = async (req, res) => {
  try {
    let {email, password, name, role} = req.body;
    // console.log (email, password, name, role);

    let user = await UserModel.findOne ({email});
    if (user) {
      return res
        .status (200)
        .json ({message: 'User already signup , Please Login'});
    }
    bcrypt.hash (password, saltRounds, async function (err, hash) {
      if (hash) {
        let newUser = await UserModel.create ({
          email,
          password: hash,
          name,
          role,
        });
        return res.status (201).json ({message: 'Signup Success', newUser});
      } else {
        return res.status (400).json ({Error: err.message});
      }
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};
//login
let login = async (req, res) => {
  try {
    let {email, password} = req.body;
    let user = await UserModel.findOne ({email});
    if (!user) {
      return res
        .status (404)
        .json ({message: 'User not found , Please signup'});
    }
    let hash = user.password;
    bcrypt.compare (password, hash, function (err, result) {
      if (result) {
        var token = jwt.sign (
          {userId: user._id, role: user.role},
          process.env.JWT_SECURITY_KEY,
          {expiresIn: "30m"}
        );
        res
          .status (200)
          .json ({message: 'User login success', token,role:user.role});
      } else {
        return res.status (400).json ({message: 'Wrong Password'});
      }
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

// profile
let Profile = async (req, res) => {
  try {
    let {userId} = req.user 
    console.log(userId)
    let userDetails = await UserModel.findById (req.user.userId);
    let userBorrowedBooks = await BorrowModel.find({userId}).populate("bookId")|| []
    // console.log(userBorrowedBooks)
    let books = []
    if(userBorrowedBooks.length==0){
      books = []
    }
    else{
      for (let user of userBorrowedBooks) {
        let book = { ...(user.bookId.toObject?.() || user.bookId), dueDate: user.dueDate };
        books.push(book);
      }
    }
    // console.log(books)
    res.status (200).json ({profile: userDetails,books});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

// update profile
let updateProfile = async (req, res) => {
  try {
    let {userId} = req.user;
    let {name, contact} = req.body;
    let user = await UserModel.findById (userId);
    user.name = name;
    user.contact = contact;
    await user.save ();
    res.status (200).json ({message: 'Profile Updated'});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};
// forgot password
const transporter = nodemailer.createTransport ({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_APP_MAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await UserModel.findOne ({email});
    if (!user) {
      return res
        .status (404)
        .json ({message: 'User not found with this email'});
    }
    const token = jwt.sign ({userId: user._id}, process.env.JWT_SECURITY_KEY, {
      expiresIn: '15m',
    });
    const passwordResetLink = `http://localhost:5173/reset-password/${token}`;
    await transporter.sendMail ({
      from: '"Aswartha" <aswarth03@gmail.com>',
      to: user.email,
      subject: 'Reset Password',
      text: `Hi ${user.name},\n\nClick the link below to reset your password (valid for 15 minutes):\n\n${passwordResetLink}\n\nIf you didn't request this, you can ignore this email.`,
    });
    res.status (200).json ({
      message: 'Password reset link sent to your email (valid for 15 minutes)',
    });
  } catch (error) {
    res.status (500).json ({message: 'Something went wrong. Try again later.'});
  }
};

let resetPassword = async (req, res) => {
  try {
    let {token} = req.params;
    let {password} = req.body;
    const decoded = jwt.verify (token, process.env.JWT_SECURITY_KEY);
    let userId = decoded.userId;
    let user = await UserModel.findById (userId);
    bcrypt.hash (password, saltRounds, async function (err, hash) {
      if (hash) {
        let newPassword = hash;
        user.password = newPassword;
        await user.save ();
        res.status (200).json ({message: 'Password Updated'});
      } else {
        return res.status (400).json ({Error: err.message});
      }
    });
  } catch (error) {
    res.status (500).json ({message: 'Something went wrong. Try again later.'});
  }
};

module.exports = {
  signUp,
  login,
  Profile,
  updateProfile,
  forgotPassword,
  resetPassword,
};
