import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { connect } from "@/lib/database/connect";
import User from "@/lib/database/models/userModels";

await connect(); // Ensure you await the connection

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      return NextResponse.json(
        { message: "User registered successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
