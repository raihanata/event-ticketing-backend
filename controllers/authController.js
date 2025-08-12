import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// registration
export const registration = async (req, res) => {
    try {

        const {firstname,lastname,password, email, gender, phone, country } = req.body;
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new User({ firstname, lastname,password: hashedPassword, email, gender, phone, country })
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

        console.log(email);

        const userData = await User.findOne({ email });
        console.log(userData);
     
        if (!userData) {

            return res.status(400).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
            console.log(passwordMatch);

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
