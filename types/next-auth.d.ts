import { ObjectId } from "mongoose";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
    id: ObjectId;
    picture?: string;
  }
}
