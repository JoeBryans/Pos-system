"use server";
import prisma from "../lib/db";
import bcrypt from "bcryptjs";

export async function CreateUser(data) {
  const { email, companyName, country, password, phone, address, city, state } =
    data;
  try {
    const image = `https://avatar.iran.liara.run/username?username=${companyName}${email}`;
    // const image = `https://avatar.iran.liara.run/public`;
    const user = await prisma.seller.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return { message: "user already exists", ok: false };
    }
    const newUser = await prisma.seller.create({
      data: {
        email: email,
        password: await bcrypt.hash(password, 10),
        companyName: companyName,
        image:image,
        // country: country,
        phone: phone,
               // zipcode: zipcode,
      },
    });

    return { message: "user created successfully", ok: true };
  } catch (error) {
    return { error, ok: false };
  }
}
