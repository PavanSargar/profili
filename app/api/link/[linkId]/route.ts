import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import Link from "@api/_models/link.model";
import dbConnect from "@api/_config/db";
import createResponse from "@api/_helpers/create-repsonse";
import { AuthConfig } from "@api/auth/[...nextauth]/auth.config";
import {
  sendValidationErrorResponse,
  validateBody,
} from "@api/_helpers/validation-utils";
import { LinkSchema } from "../link.schema";
import { NextResponse } from "next/server";

interface Params {
  params: {
    linkId: string;
  };
}

//TODO: re-order links after deleting a link

//* delete link
export const DELETE = async (req: Request, { params }: Params) => {
  try {
    const linkId = params.linkId;
    await dbConnect();
    const deletedLink = await Link.findByIdAndDelete(linkId).exec();

    if (!deletedLink) {
      return NextResponse.json(createResponse.error(
        "Something went wrong while deleting Link",
        500
      ));
    }

    return NextResponse.json(createResponse.success({ deletedLink }));
  } catch (error: any) {
    console.error(error?.message);
    throw NextResponse.json(createResponse.error("Error while deleting link", 500));
  }
};

//* update link data
export const PUT = async (req: Request, { params }: Params) => {
  const body = await req.json();
  const linkId = params.linkId;

  try {
    const session = await getServerSession(AuthConfig);
    if (!session) {
      return NextResponse.json(createResponse.error("Unauthorized", 401));
    }

    if (!mongoose.isValidObjectId(linkId)) {
      return NextResponse.json(createResponse.error("Invalid Link Id", 500));
    }
    const validation = validateBody(LinkSchema, {
      ...body,
    });
    if (validation.error) {
      return sendValidationErrorResponse(validation.error);
    }
    const newLinkData = validation.data;

    await dbConnect();
    const updatedLink = await Link.findByIdAndUpdate(linkId, {
      $set: {
        ...newLinkData,
      },
    }, {new: true}).exec();

    if (!updatedLink) {
      return NextResponse.json(
        createResponse.error("Error while updating link", 500)
      );
    }

    return NextResponse.json(
      createResponse.success({
        title: updatedLink.title,
        url: updatedLink.url,
        order: updatedLink.order,
        _id: updatedLink._id,
      })
    );
  } catch (error: any) {
    console.error(error?.message);
    throw NextResponse.json(
      createResponse.error("Error while deleting link", 500)
    );
  }
};

//* patch link click
export const PATCH = async (req: Request, { params }: Params) => {
    const body = await req.json();
    const linkId = params.linkId;
  
    try {
      const session = await getServerSession(AuthConfig);
      if (!session) {
        return NextResponse.json(createResponse.error("Unauthorized", 401));
      }
  
      if (!mongoose.isValidObjectId(linkId)) {
        return NextResponse.json(createResponse.error("Invalid Link Id", 500));
      }
  
      await dbConnect();
      const updatedLink = await Link.findByIdAndUpdate(
        linkId,
        {
          $inc: {
            clicks: 1,
          },
        },
        { new: true }
      )
        .select(["url", "title", "order", "active", "pin", "thumbnail", "clicks"])
        .lean();
  
      if (!updatedLink) {
        return NextResponse.json(
          createResponse.error("Link does not exist or something went wrong", 500)
        );
      }
  
      return NextResponse.json(
        createResponse.success({
          title: updatedLink?.title,
          url: updatedLink?.url,
          clicks: updatedLink?.clicks,
          active: updatedLink?.active,
          pin: updatedLink?.pin,
          _id: updatedLink?._id,
        })
      );
    } catch (error: any) {
      console.error(error?.message);
      return NextResponse.json(
        createResponse.error("Error while deleting link", 500)
      );
    }
  };
  