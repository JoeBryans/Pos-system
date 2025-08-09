"use server";
import { LoggedInUser } from "../lib/LoggedUser";
import prisma from "../lib/db";

export async function CreateSales(data, productId) {
    console.log("productId", productId);
    
  const {  quantity, salePrice } = data;
  const salePrices = parseInt(salePrice);
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const newSale = await prisma.saleItem.create({
      data: {
        productId: productId,
        quantity: quantity,
        salePrice: salePrice,
        sellerId: user.id,
      },
    });
    console.log("newProduct", newSale);

    return { newSale, ok: true };
  } catch (error) {
    console.log(error);
    return { error, ok: false };
  }
}

// export async function GetProducts() {
//   const user = await LoggedInUser();

//   if (!user) {
//     return { message: "user not found", ok: false };
//   }
//     try {
//         const products = await prisma.product.findMany({
//           where: {
//             sellerId: user.id,
//           },
//           include: {
//             category: true,
//             // brand: true,
//             // stock: true,
//             // images: true,
//             warehouse: {
//               select: {
//                 name: true,
//               },
//             },
//             supplier: true,
//             units: {
//               select: {
//                 name: true,
//               },
//             },

//             images: {
//               select: {
//                 url: true,
//               },
//             },
//             stock: {
//               select: {
//                 quantity: true,
//               },
//             },
//             brand: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         });

//   const totalProducts = await prisma.product.count({
//     where: {
//       sellerId: user.id,
//     },
//   });
//   const totalValue = await prisma.product.aggregate({
//     where: {
//       sellerId: user.id,
//     },
//     _sum: {
//       sellingPrice: true,
//     },
//   });
// const sumPrice = totalValue?._sum?.sellingPrice;
// return { products, totalProducts, sumPrice };
// } catch (error) {
// // console.log(error);
// return error;
// }
// }
