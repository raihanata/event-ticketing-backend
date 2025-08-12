import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// registration
export const registration = async (req, res) => {
    try {

        const { name, password, email, gender, phone, country } = req.body;
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new User({ name, password: hashedPassword, email, gender, phone, country })
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
        const { name, password } = req.body;

        console.log(name);

        const userData = await User.findOne({ name });
        console.log(userData);
        res.send("success")
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
            data: {
                token,
                user: {
                    email: userData.email
                }
            }
        });
    }
    catch (error) {
        console.log(error);

        res.status(400).json({ error: 'Login failed' });
    }


}
