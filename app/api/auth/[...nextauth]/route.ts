import NextAuth from "next-auth";
import { AuthConfig } from "./auth.config";

const handler = NextAuth(AuthConfig);

export { handler as GET, handler as POST };
