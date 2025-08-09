"use server";
import { LoggedInUser } from "../lib/LoggedUser";
import prisma from "../lib/db";

export async function CreateProduct(data, imageUrl) {
  // const { name, category, sku, price, brand, stock, description } = data;
  // console.log("imageUrl", imageUrl);
  // console.log("data", data);
  const {
    name,
    category,
    sku,
    stock,
    description,
    supplierId,
    barcode,
    buyingPrice,
    sellingPrice,
    discount,
    lowStock,
    taxRate,
    warehouseId,
    unitId,
    brand,
    dimensions,
    weight,
  } = data;
  const stocks = parseInt(stock);
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        categoryId: category,
        sku: sku,
        buyingPrice: buyingPrice,
        sellingPrice: sellingPrice,
        discount: discount,
        lowStock: lowStock,
        taxRate: taxRate,
        warehouseId: warehouseId,
        unitId: unitId,
        brandId: brand,
        dimensions: dimensions,
        weight: weight,
        description: description,
        supplierId: supplierId,
        barcode: barcode,
        images: {
          create: {
            url: imageUrl,
          },
        },
        stock: {
          create: {
            quantity: stocks,
          },
        },
        sellerId: user.id,
      },
    });
    console.log("newProduct", newProduct);

    return { newProduct, ok: true };
  } catch (error) {
    console.log(error);
    return { error, ok: false };
  }
}

export async function GetProducts() {
  const user = await LoggedInUser();

  if (!user) {
    return { message: "user not found", ok: false };
  }
  try {
    const products = await prisma.product.findMany({
      where: {
        sellerId: user.id,
      },
      include: {
        category: true,
        // brand: true,
        // stock: true,
        // images: true,
        warehouse: {
          select: {
            name: true,
          },
        },
        supplier: true,
        units: {
          select: {
            name: true,
          },
        },

        images: {
          select: {
            url: true,
          },
        },
        stock: {
          select: {
            quantity: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
      },
    });
    // const totalProducts = await prisma.product.count();
    const totalProducts = await prisma.product.count({
      where: {
        sellerId: user.id,
      },
    });
    const totalValue = await prisma.product.aggregate({
      where: {
        sellerId: user.id,
      },
      _sum: {
        sellingPrice: true,
      },
    });
    const sumPrice = totalValue?._sum?.sellingPrice;
    return { products, totalProducts, sumPrice };
  } catch (error) {
    // console.log(error);
    return error;
  }
}
export async function FilterProducts({ category, search }) {
  // console.log("categories2", category);
  // console.log("search", search);

  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const products = await prisma.product.findMany({
      where: {
        sellerId: user.id,
        category: {
          name: { contains: category },
        },
      },
      include: {
        category: true,
        images: {
          select: {
            url: true,
          },
        },
        stock: {
          select: {
            quantity: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        warehouse: {
          select: {
            name: true,
          },
        },
        supplier: true,
        units: {
          select: {
            name: true,
          },
        },
      },
    });
    const FilterProduct = await prisma.product.findMany({
      where: {
        // sellerId: user.id,
        OR: [
          {
            name: { contains: search, mode: "insensitive" },
            // brand: { 
            //   name: { contains: search, mode: "insensitive" },
            //  },
            // sku: { contains: search,mode: "insensitive" },
          },
        ],
      },
      include: {
        category: true,
        images: {
          select: {
            url: true,
          },
        },
        stock: {
          select: {
            quantity: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        warehouse: {
          select: {
            name: true,
          },
        },
        supplier: true,
        units: {
          select: {
            name: true,
          },
        },
      },
    });
    // console.log("productsCat", products);
    console.log("FilterProduct", FilterProduct);

    return { products, FilterProduct };
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function GetSingleProduct(id) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: {
          select: {
            id: true,
          },
        },
      },
    });
    return product;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export async function updateProduct(id, data) {
  const {
    name,
    category,
    sku,
    stock,
    description,
    imageUrl,
    supplierId,
    barcode,
    buyingPrice,
    sellingPrice,
    discount,
    lowStock,
    taxRate,
    warehouseId,
    unitId,
    brand,
    dimensions,
    weight,
  } = data;
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const updatedProduct = await prisma.product.update({
      where: {
        id: id,
        sellerId: user.id,
      },
      data: {
        name: name,
        categoryId: category,
        sku: sku,
        buyingPrice: buyingPrice,
        sellingPrice: sellingPrice,
        discount: discount,
        lowStock: lowStock,
        taxRate: taxRate,
        warehouseId: warehouseId,
        unitId: unitId,
        brandId: brand,
        dimensions: dimensions,
        weight: weight,
        stock: stock,
        description: description,
        supplierId: supplierId,
        barcode: barcode,
        imageUrl: imageUrl,
      },
    });
    // console.log(updatedProduct);
    return { updatedProduct, ok: true };
  } catch (error) {
    // console.log(error);
    return { error, ok: false };
  }
}

export async function DeletProduct(id) {
  try {
    const user = await LoggedInUser();

    if (!user) {
      return { message: "user not found", ok: false };
    }
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id,
        sellerId: user.id,
      },
    });
    return { deletedProduct, ok: true };
  } catch (error) {
    return { error, ok: false };
  }
}
