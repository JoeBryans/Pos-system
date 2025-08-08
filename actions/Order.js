import prisma from "../lib/db";

export async function POST(customerId, total, orderItems) {
  try {
    const orderItem = orderItems.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      };
    });
    const newOrder = await prisma.order.create({
      data: {
        customerId: customerId,
        orderItems: {
          create: { orderItem },
        },
        total: total,
      },
    });
    console.log(newOrder);
    return newOrder;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    console.log(orders);
    return orders;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function PUT(id, customerId, total) {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        customerId: customerId,
        total: total,
      },
    });
    console.log(updatedOrder);
    return updatedOrder;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function DELETE(id) {
  try {
    const deletedOrder = await prisma.order.delete({
      where: {
        id: id,
      },
    });
    console.log(deletedOrder);
    return deletedOrder;
  } catch (error) {
    console.log(error);
    return error;
  }
}
