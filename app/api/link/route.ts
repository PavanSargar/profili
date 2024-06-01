import dbConnect from "@api/_config/db";
import {
  sendValidationErrorResponse,
  validateBody,
} from "@api/_helpers/validation-utils";
import { NextRequest, NextResponse } from "next/server";
import Link from "@api/_models/link.model";
import { LinkSchema, LinkType } from "./link.schema";
import { getServerSession } from "next-auth/next";
import { AuthConfig } from "@api/auth/[...nextauth]/auth.config";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = (await req.json()) as LinkType;
  try {
    const session = await getServerSession(AuthConfig);
    console.log("session:::", session);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const validation = validateBody(LinkSchema, body);
    if (validation.error) {
      sendValidationErrorResponse(validation.error);
    }

    const {} = body;

    await dbConnect();
  } catch (error: any) {
    throw new NextResponse(error, {
      status: 500,
    });
  }
};

export const GET = async (req: any, res: NextResponse) => {
  try {
    const session = await getServerSession(AuthConfig);
    console.log("session:::", session);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();
    const links = await Link.findOne({ user: session?.user?.id }).select([
      "title",
      "url",
      "order",
      "active",
    ]);

    return NextResponse.json({
      body: {
        links,
      },
      message: "success",
    });
  } catch (error: any) {
    throw new NextResponse(error, {
      status: 500,
    });
  }
};
