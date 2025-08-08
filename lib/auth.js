import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextResponse } from "next/server";
import prisma from "./db";
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // GithubProv
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {

          const existUser = await prisma.seller.findUnique({
            where: { email: credentials.email },
          });
          if (!existUser) {
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            existUser.password
          );

          if (!isValid) {
            return null;
          }
          

          const { password, ...user } = existUser;
          
          return user;
        } catch (error) {
          return NextResponse.json(error?.message);
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (account.provider === "google") {
    //     return profile.email_verified && profile.email.endsWith("@example.com");
    //   }
    //   return true; // Do different verification for other providers that don't have `email_verified`
    // },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;

      }
      // console.log("token :", token);
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      // console.log("session :", session);
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    // error: "/error", // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
};
