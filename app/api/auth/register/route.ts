import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@api/db";
import User from "@models/user.model";
import Profile from "@models/profile.model";
import Appearance from "@models/appearance.model";
import { registerSchema } from "app/(auth)/auth.schema";
import {
  sendValidationErrorResponse,
  validateBody,
} from "@api/helpers/validation-utils";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  try {
    //* field validation
    const validation = validateBody(registerSchema, {
      ...body,
      passwordConfirm: body?.password,
    });
    if (validation.error) {
      return sendValidationErrorResponse(validation.error, res);
    }
    const { email, firstName, lastName, password } = validation.data;

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return new NextResponse(
        `Account with ${email} already exists. Try with another email.`,
        { status: 400 }
      );

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
    if (!savedUser) {
      return new NextResponse(`Something went wrong while registering user`, {
        status: 500,
      });
    }

    const newProfile = new Profile({
      user: savedUser?._id,
      displayName: `${savedUser?.firstName} ${savedUser?.lastName}`,
    });

    const newAppearance = new Appearance({
      user: savedUser?._id,
    });

    //* new user profile and default appearance settings
    const [savedProfile, savedAppearance] = await Promise.all([
      newProfile.save(),
      newAppearance.save(),
    ]);

    if (!savedProfile && !savedAppearance) {
      return new NextResponse(`Something went wrong while registering user`, {
        status: 500,
      });
    }

    return new NextResponse("success", { status: 200 });
  } catch (err: any) {
    throw new NextResponse(err, {
      status: 500,
    });
  }
};
