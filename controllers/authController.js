import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// registration
export const registration = async (req, res) => {
    try {

        const { firstname, lastname, password, email, gender, phone, country } = req.body;

        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new User({ firstname, lastname, password: hashedPassword, email, gender, phone, country })
        await newuser.save();
        res.status(200).json({ message: 'User registered successfully' });

    }
    catch (error) {
        console.log(error);

        res.status(400).json({ error: 'Registration failed' });

    }
}

//login

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        console.log(email, 'email');

        const userData = await User.findOne({ email });
        console.log(userData, 'userData');

        if (!userData) {

            return res.status(400).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
            console.log(passwordMatch, 'password match');

            return res.status(400).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: userData._id }, process.env.JWT_TOKEN, {
            expiresIn: '1h',
        });
        res.status(200).json({
            status: true,
            message: '',
            token,
            data: userData
        });
    }
    catch (error) {
        console.log(error);

        res.status(400).json({ error: 'Login failed' });
    }


}
//forgot password
export const forgotpwdcheck = async (req, res) => {
    try {
        const { email } = req.body
        console.log(email);

        const forgotpwdUser = await User.findOne({ email });
        console.log(forgotpwdUser);
        if (!forgotpwdUser) {


            return res.status(404).json({ message: "User not found" });

        }
        const otp = '0000';
        forgotpwdUser.otp = otp;
        forgotpwdUser.otpExpiry = Date.now() + 5 * 60 * 1000;
        await forgotpwdUser.save();
        console.log("OTP", otp);
        res.json({ message: "OTP sent to your email" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'serverfailed' });
    }
}
//verify otp for forgot password
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(req.body);

        const userOtp = await User.findOne({
            email, otp, otpExpiry: { $gt: Date.now() }
        });

        if (!userOtp) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        console.log(userOtp);

        const token = jwt.sign({ userId: userOtp._id }, process.env.JWT_TOKEN, {
            expiresIn: "5m"  // short expiry for reset
        });

        console.log(token)
        return res.status(200).json({
            status: true,
            message: "OTP verified successfully",
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'serverfailed' });
    }
}
//reset password
export const resetPassword = async (req, res) => {
    try {

        const { email, otp, newpassword } = req.body;
        console.log(req.body);

        const resetData = await User.findOne({ email, otp, otpExpiry: { $gt: Date.now() } });
        console.log(resetData);

        if (!resetData) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        resetData.password = newpassword;
        resetData.otp = undefined;
        resetData.otpExpiry = undefined;

        await resetData.save();

        res.json({
            message: "Password reset successfully",
            status: true,

        });

    } catch (error) {

    }
}