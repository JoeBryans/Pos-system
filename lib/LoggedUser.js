"use server";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth/next";
export const LoggedInUser = async () => {
  const user = await getServerSession(authOptions);
  const currentUser = user?.user;
  // console.log("currentUser", currentUser);
  return currentUser;
};
