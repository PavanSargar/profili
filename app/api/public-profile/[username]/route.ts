import { NextResponse } from "next/server";
import dbConnect from "@api/_config/db";
import Link from "@api/_models/link.model";
import User from "@api/_models/user.model";
import { LinkType } from "@api/link/link.schema";
import createResponse from "@api/_helpers/create-repsonse";

interface Params {
  params: {
    username: string;
  };
}

export const GET = async (req: any, { params }: Params) => {
  try {
    const username = params.username;

    await dbConnect();
    const user = await User.findOne({ userName: username }).exec();

    if (!user) {
      return NextResponse.json(createResponse.error("User not found", 404));
    }

    const links = (await Link.find({
      user: user._id,
    })
      .lean()
      .select([
        "title",
        "url",
        "order",
        "active",
        "pin",
        "clicks",
        "thumbnail",
      ])) as Partial<LinkType[]>;

    return NextResponse.json(
      createResponse.success<Partial<LinkType[]>>(links)
    );
  } catch (error: any) {
    console.error(error?.message);
    return createResponse.error("Error while creating links", 500);
  }
};
