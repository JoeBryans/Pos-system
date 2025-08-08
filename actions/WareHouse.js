"use server";
import prisma from "../lib/db";
import { LoggedInUser } from "../lib/LoggedUser";

export async function CreateWareHouse(data) {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const newWareHouse = await prisma.warehouse.create({
      data: {
        name: data.name,
        warehouseType: data.warehouseType,
        location: data.location,
        description: data.description,
        sellerId: user.id,
      },
    });
    console.log(newWareHouse);
    return { newWareHouse, ok: true };
  } catch (error) {
    console.log(error);
    return { error, ok: false };
  }
}

export async function GETWareHouse() {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const warehouses = await prisma.warehouse.findMany({
      where: {
        sellerId: user.id,
      },
    });

    return warehouses;
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
    const updatedWareHouse = await prisma.warehouse.update({
      where: {
        id: id,
        sellerId: user.id,
      },
      data: {
        name: name,
      },
    });
    console.log(updatedWareHouse);
    return updatedWareHouse;
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
    const deletedWareHouse = await prisma.warehouse.delete({
      where: {
        id: id,
        sellerId: user.id,
      },
    });
    console.log(deletedWareHouse);
    return deletedWareHouse;
  } catch (error) {
    console.log(error);
    return error;
  }
}                                       