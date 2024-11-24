import { OAuth2Client } from 'google-auth-library';
import asyncHandler from 'express-async-handler';
import User from '../Models/user.models.js';
import generateToken from '../utils/generateToken.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID
});

export const googleAuth = asyncHandler(async (req, res) => {
    const { credential } = req.body;

    try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                name,
                email,
                password: email + process.env.JWT_SECRET,
                pic: picture,
                country: "India",
                state: "Unknown",
                zipCode: "000000"
            });
        }

        // Generate JWT token and send response
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401);
        throw new Error('Invalid Google token');
    }
});