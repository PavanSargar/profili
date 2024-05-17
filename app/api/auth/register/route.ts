import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@models/user";
import dbConnect from "@api/db";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, password, firstName, lastName } = await req.json();
  try {
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) return new NextResponse(`Account with ${email} already exists. Try with another email.`, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      passwordConfirm: hashedPassword,
      userName: email,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      return new NextResponse("success", { status: 200 });
    }
  } catch (err: any) {
    throw new NextResponse(err, {
      status: 500,
    });
  }
};
