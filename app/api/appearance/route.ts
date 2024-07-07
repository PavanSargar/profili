import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AppearanceModel from "@api/_models/appearance.model";
import createResponse from "@api/_helpers/create-repsonse";
import { AuthConfig } from "@api/auth/[...nextauth]/auth.config";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(AuthConfig);
    if (!session) {
      return NextResponse.json(createResponse.error("Unauthorized user", 401));
    }
    const appearance = await AppearanceModel.findOneAndUpdate(
      { user: session.id },
      { $setOnInsert: { user: session.id } },
      { new: true, upsert: true, select: "-user" }
    );

    if (!appearance) {
      return NextResponse.json(
        createResponse.error(
          "Something went wrong while fetching appearances",
          401
        )
      );
    }

    return NextResponse.json(createResponse.success(appearance));
  } catch (error: any) {
    throw NextResponse.json(
      createResponse.error(`${error.message || "something went wrong"}`, 500)
    );
  }
};
