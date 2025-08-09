"use server";
import { revalidatePath } from "next/cache";
import prisma from "../lib/db";
import { LoggedInUser } from "../lib/LoggedUser";

export async function StockAdjustment(data, value) {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const newAdjustStock = await prisma.adjustStock.create({
      data: {
        productId: value,
        avaliableQuantity: data.avaliableQuantity,
        adjustQuantity: data.adjustQuantity,
        description: data.description,
        sellerId: user.id,
        note: data.note,
        reference: data.reference,
        warehouseId: data.warehouseId,
      },
    });
    console.log(newAdjustStock);
    revalidatePath("/admin/inventory");

    return { newAdjustStock, ok: true };
  } catch (error) {
    console.log(error);
    return { error, ok: false };
  }
}
export async function StockTransfer(data, value, recieveWarehouse) {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const newAdjustStock = await prisma.transferStock.create({
      data: {
        productId: value,
        // quantity: data.quantity,
        adjustQuantity: data.adjustQuantity,
        avaliableQuantity: data.avaliableQuantity,
        description: data.description,
        note: data.note,
        reference: data.reference,
        sellerId: user.id,
        warehouseId: data.warehouseId,
        reciveingWarehouse: recieveWarehouse,
      },
    });
    console.log(newAdjustStock);
    revalidatePath("/admin/inventory");

    return { newAdjustStock, ok: true };
  } catch (error) {
    console.log(error);
    return { error, ok: false };
  }
}

export async function GETInventory() {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const result = await prisma.adjustStock.findMany({
      where: {
        sellerId: user.id,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            sku: true,
            barcode: true,
            stock: {
              select: {
                quantity: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
              },
            },
            units: {
              select: {
                id: true,
                name: true,
              },
            },
            brand: {
              select: {
                id: true,
                name: true,
              },
            },
            images: {
              select: {
                url: true,
              },
            },
          },
        },
        warehouse: true,
        sellers: true,
      },
    });

    console.log("result", result);
    // const totalValue = await prisma.product.aggregate({
    //   where: {
    //     sellerId: user.id,
    //   },
    //   _sum: {
    //     sellingPrice: true,
    //   },
    // });

    // console.log("totalValue", totalValue);
    // console.log("inventory", inventory);

    return result;
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
    const updatedInventory = await prisma.inventory.update({
      where: {
        id: id,
        sellerId: user.id,
      },
      data: {
        name: name,
      },
    });
    console.log(updatedInventory);
    return updatedInventory;
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
    const deletedInventory = await prisma.inventory.delete({
      where: {
        id: id,
        sellerId: user.id,
      },
    });
    console.log(deletedInventory);
    return deletedInventory;
  } catch (error) {
    console.log(error);
    return error;
  }
}
