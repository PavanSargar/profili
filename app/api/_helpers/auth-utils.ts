import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const getUserSession = async (req: NextRequest) => {
  const token = await getToken({ req });
  return token;
};
