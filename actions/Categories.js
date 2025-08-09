"use server";
import { revalidatePath } from "next/cache";
import prisma from "../lib/db";
import { LoggedInUser } from "../lib/LoggedUser";
import { ca } from "zod/v4/locales";

export async function CreateCategory(data) {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        sellerId: user.id,
      },
    });
    console.log(newCategory);
    revalidatePath("/admin/categories");
    return { newCategory, ok: true };
  } catch (error) {
    console.log(error);
    return { error, ok: false };
  }
}

export async function GETCategory() {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
      const categories = await prisma.category.findMany({
      where: {
        sellerId: user.id,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
    console.log("categories", categories);
    return categories;
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
    const updatedCategory = await prisma.category.update({
      where: {
        id: id,
        sellerId: user.id,
      },
      data: {
        name: name,
      },
    });
    console.log(updatedCategory);
    return updatedCategory;
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
    const deletedCategory = await prisma.category.delete({
      where: {
        id: id,
        sellerId: user.id,
      },
    });
    console.log(deletedCategory);
    return deletedCategory;
  } catch (error) {
    console.log(error);
    return error;
  }
}
