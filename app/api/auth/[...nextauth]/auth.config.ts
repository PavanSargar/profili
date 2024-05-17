import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@api/db";
import User from "@models/user";

export const AuthConfig: NextAuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        await dbConnect();
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const isPasswordValid = await bcrypt.compare(
              credentials?.password,
              user?.password
            );
            if (isPasswordValid) {
              return user;
            }
          }
        } catch (err: any) {
          return err;
        }
      },
    }),
    GitHubProvider({
      profile(profile, tokens) {
        return {
          ...profile,
          role: "GITHUB",
          firstName: profile?.name?.split(" ")[0] ?? "",
          lastName: profile?.name?.split(" ").at(-1) ?? "",
          picture: profile?.avatar_url,
          email: profile?.email,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GoogleProvider({
      profile(profile, tokens) {
        return {
          ...profile,
          id: profile?.sub,
          role: "GOOGLE",
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          picture: profile?.picture,
          email: profile?.email,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }: any) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "google") {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: user?.email });
          if (!existingUser) {
            const hashedPassword = await bcrypt.hash(
              profile?.sub ?? user?.id,
              10
            );

            const newUser = new User({
              email: user?.email,
              password: hashedPassword,
              passwordConfirm: hashedPassword,
              userName: user?.email,
              firstName: user?.given_name,
              lastName: user?.family_name,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (error: any) {
          console.log("error saving user", error?.message);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }: any) {
      if (account?.provider === "google") {
        return {
          ...token,
          id: user?.id,
          picture: user?.picture,
          firstName: user?.given_name,
          lastName: user?.family_name,
          role: user?.role,
        };
      } else if (account?.provider === "github") {
        return {
          ...token,
          firstName: user?.firstName,
          lastName: user?.lastName,
          role: user?.role,
          picture: user?.picture,
          email: user?.email,
        };
      }
      return token;
    },
    async session({ session, token, user }: any) {
      if (session?.user) {
        session.user.role = token?.role ?? "";
        session.user.firstName = token?.firstName;
        session.user.lastName = token?.lastName;
      }
      return session;
    },
  },
};
