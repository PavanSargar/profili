import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const isAuthenticated = async (req: NextRequest): Promise<boolean> => {
  const token = await getToken({ req });
  return !!token;
};
