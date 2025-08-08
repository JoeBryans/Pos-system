"use server";
import { revalidatePath } from "next/cache";
import prisma from "../lib/db";
import { LoggedInUser } from "../lib/LoggedUser";

export async function CreateBrand(data) {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const newBrand = await prisma.brand.create({
      data: {
        name: data.name,
        description: data.description,
        // sellerId: user.id,
      },
    });
    // console.log(newBrand);
    // revalidatePath("/admin");
    return { newBrand, ok: true };
  } catch (error) {
    console.log(error);
    return { error, ok: false };
  }
}

export async function GETBrand() {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const brands = await prisma.brand.findMany();

    return brands;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function PUT(id, name) {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const updatedBrand = await prisma.Brand.update({
      where: {
        id: id,
        sellerId: user.id,
      },
      data: {
        name: name,
      },
    });
    console.log(updatedBrand);
    return updatedBrand;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function DELETE(id) {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const deletedBrand = await prisma.Brand.delete({
      where: {
        id: id,
        sellerId: user.id,
      },
    });
    console.log(deletedBrand);
    return deletedBrand;
  } catch (error) {
    console.log(error);
    return error;
  }
}
