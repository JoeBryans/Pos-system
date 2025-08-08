"use server";
import { revalidatePath } from "next/cache";
import prisma from "../lib/db";
import { LoggedInUser } from "../lib/LoggedUser";

export async function CreateUnit(data) {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const newUnit = await prisma.unit.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    console.log(newUnit);
    revalidatePath("/admin/item-groups/units");
    return { newUnit, ok: true };
  } catch (error) {
    console.log(error);
    return { error, ok: false };
  }
}

export async function GETUnit() {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const units = await prisma.unit.findMany();

    return units;
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
    const updatedUnit = await prisma.unit.update({
      where: {
        id: id,
        sellerId: user.id,
      },
      data: {
        name: name,
      },
    });
    console.log(updatedUnit);
    return updatedUnit;
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
    const deletedUnit = await prisma.unit.delete({
      where: {
        id: id,
        sellerId: user.id,
      },
    });
    console.log(deletedUnit);
    return deletedUnit;
  } catch (error) {
    console.log(error);
    return error;
  }
}               
