import { errorTypes } from "@api/_config/constants";
import { NextResponse } from "next/server";
import { ZodError, ZodSchema, z } from "zod";

export function validateBody<T extends ZodSchema>(schema: T, data: unknown) {
  type SchemaType = z.infer<T>;
  try {
    const result = schema.safeParse(data);
    if (result.success) {
      return {
        success: true,
        data: result.data as SchemaType,
      };
    } else {
      return {
        success: false,
        error: result.error,
      };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      throw error;
    }
    throw new Error("Unknown validation error");
  }
}

export function sendValidationErrorResponse(error: ZodError) {
  return NextResponse.json(
    {
      error: {
        message: errorTypes.validation,
        errors: error.errors.map(
          (item) => `${item.path.join(".")}: ${item.message}`
        ),
      },
    },
    { status: 400 }
  );
}
