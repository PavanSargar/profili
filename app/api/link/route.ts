import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@api/_config/db";
import Link from "@api/_models/link.model";
import { LinkSchema, LinkType } from "./link.schema";
import {
  sendValidationErrorResponse,
  validateBody,
} from "@api/_helpers/validation-utils";
import { AuthConfig } from "@api/auth/[...nextauth]/auth.config";
import createResponse from "@api/_helpers/create-repsonse";

//* create links
export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  try {
    const session = await getServerSession(AuthConfig);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const validation = validateBody(LinkSchema, {
      ...body,
    });
    if (validation.error) {
      return sendValidationErrorResponse(validation.error);
    }

    const { title, url, order } = validation.data;

    await dbConnect();

    const newLink = new Link({
      title,
      url,
      order,
      user: session?.id,
    });

    const savedLink = await newLink.save();

    if (!savedLink) {
      return NextResponse.json(
        createResponse.error("Error while creating linke", 500)
      );
    }
    return NextResponse.json(
      createResponse.success({
        title,
        url,
        order,
        _id: savedLink?._id,
      })
    );
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json(
      createResponse.error(
        `${error?.message || "Error while creating links"}`,
        500
      )
    );
  }
};

//* get links
export const GET = async (req: any, res: NextResponse) => {
  try {
    const session = await getServerSession(AuthConfig);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();

    const links = (await Link.find({
      user: session.id,
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


//* update links order
export const PUT = async (req: Request, res: NextResponse) => {
  const body = await req.json();

  try {
    const { newOrderedLinks } = body as { newOrderedLinks: any[] };
    const session = await getServerSession(AuthConfig);
    if (!session) {
      return NextResponse.json(createResponse.error("Unauthorized", 401));
    }
    if (!newOrderedLinks?.length) {
      return NextResponse.json(createResponse.error("Empty Payload", 500));
    }

    const updateLinkOperations = body.newOrderedLinks.map((link: any) => ({
      updateOne: {
        filter: { user: session.id, _id: link._id },
        update: { $set: link },
      },
    }));

    await dbConnect();

    await Link.bulkWrite(updateLinkOperations);

    //   const validation = validateBody(LinkSchema, {
    //     ...body,
    //   });
    //   if (validation.error) {
    //     return sendValidationErrorResponse(validation.error);
    //   }
    //   const newLinkData = validation.data;

    return NextResponse.json(createResponse.success({}));
  } catch (error: any) {
    console.error(error?.message);
    throw NextResponse.json(
      createResponse.error("Error while deleting link", 500)
    );
  }
};
