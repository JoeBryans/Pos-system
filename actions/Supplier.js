"use server";
import { revalidatePath } from "next/cache";                                                                                                                            
import prisma from "../lib/db";
import { LoggedInUser } from "../lib/LoggedUser";

export async function CreateSupplier(data) {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const newSupplier = await prisma.supplier.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        paymentTems: data.paymentTems,
            code: data.code,
        sellerId: user.id,
      },
    });
    console.log(newSupplier);
    revalidatePath("/admin/suppliers");
    return { newSupplier, ok: true };
  } catch (error) {
    console.log(error);
    return { error, ok: false };
    }                                                                                                                 
    
}

export async function GETSupplier() {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
      const suppliers = await prisma.supplier.findMany(
        {
          where: {
            sellerId: user.id,
          },
        }
    );

    return suppliers;
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
    const updatedSupplier = await prisma.supplier.update({
      where: {
        id: id,
        sellerId: user.id,
      },
      data: {
        name: name,
      },
    });
    console.log(updatedSupplier);
    return updatedSupplier;
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
    const deletedSupplier = await prisma.supplier.delete({
      where: {
        id: id,
        sellerId: user.id,
      },
    });
    console.log(deletedSupplier);
    return deletedSupplier;
  } catch (error) {
    console.log(error);
    return error;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
}
}