

import { connect } from "@/lib/database/connect.js";
import User from "@/lib/database/models/userModels";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {NextResponse } from 'next/server';

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User not registered" },
                { status: 404 }
            );
        }

        // Validate password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 400 }
            );
        }

        // Create JWT token
        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.name,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });
        const userdata = {
            email: user.email,
            name: user.name,
        };

        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true,
            data: userdata,
        });

        response.cookies.set("AuthToken", token, { httpOnly: true, path: '/' });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
