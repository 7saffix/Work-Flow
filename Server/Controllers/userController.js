import bcryptjs from "bcryptjs";

import userModel from "../Models/usersModel.js";
import { encodeTokenAndSetCookie } from "../Utilities/tokenUtility.js";
import { sendEmail } from "../Utilities/emailUtility.js";

// registration
export const signup = async (req, res) => {
  const { username, email, fullName, password } = req.body;

  try {
    if (!username || !email || !fullName || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All field required!" });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist!" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const user = new userModel({
      username,
      email,
      fullName,
      password: hashPassword,
    });
    await user.save();
    return res
      .status(201)
      .json({ success: true, message: "Registration Successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message.toString() });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "invalid email" });
    }

    // Await the password comparison
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid password" });
    }

    const token = encodeTokenAndSetCookie(res, email, user._id);
    const userObj = user.toObject();
    delete userObj.password;

    // Send the response once after everything is done
    return res.status(200).json({
      success: true,
      message: "login successful",
      token: token,
      user: userObj,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message.toString() });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "logout successful" });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message.toString() });
  }
};

//profile read
export const profileRead = async (req, res) => {
  const email = req.headers.email;
  try {
    const user = await userModel.findOne({ email });
    res.status(200).json({
      success: true,
      data: {
        email: user.email,
        username: user.username,
        fullname: user.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message.toString() });
  }
};

//profile update
export const profileUpdate = async (req, res) => {
  const userId = req.headers.id;
  const updatedData = req.body;
  try {
    await userModel.updateOne({ _id: userId }, updatedData);
    res.status(200).json({ success: true, message: "update successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message.toString() });
  }
};

//email verification
export const emailVerify = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "email does not exist!" });
    } else {
      const otp = Math.floor(Math.random() * 900000 + 100000);
      const EmailTo = user["email"];
      const EmailSubject = "Email verification code";
      const EmailText = "Your verification code is: " + otp;

      await sendEmail(EmailTo, EmailSubject, EmailText);
      await userModel.updateOne({ email: email }, { otp: otp });
      res.status(200).json({ success: true, message: "check your email" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message.toString() });
  }
};

//otp verification
export const otpVerify = async (req, res) => {
  const { otp } = req.body;
  try {
    const data = await userModel.findOne({ otp });
    if (!data) {
      res.status(400).json({ success: false, message: "invalid otp" });
    } else {
      res.status(200).json({ success: true, message: "otp verified" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message.toString() });
  }
};

//reset password
export const resetPassword = async (req, res) => {
  const { email } = req.params;
  const { newPass } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "invalid otp" });
    } else {
      await userModel.updateOne(
        { email: email },
        { password: newPass, otp: 0 }
      );
      res
        .status(200)
        .json({ success: true, message: "password update successful" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message.toString() });
  }
};
