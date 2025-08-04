import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { cn } from "../../../../../lib/utils";
import {
  DollarSign,
  PackageIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
 const cardData = [
  {
    title: "Today Sales",
    description: "Total sales From last 24 hours",
    icon: <DollarSign size={15} />,
    value: "$1,000",
    color: "text-green-500",
  },
  {
    title: "Total Products",
    description: "Total products for the last 30 days",
    icon: <PackageIcon size={15} />,
    value: "$1,000",
    color: "text-purple-500",
  },

  {
    title: "Orders",
    description: "Total orders for the last 30 days",
    icon: <ShoppingBagIcon size={15} />,
    value: "$1,000",
    color: "text-blue-500",
  },
  {
    title: "Customers",
    description: "Total customers for the last 30 days",
    icon: <UsersIcon size={15} />,
    value: "$1,000",
    color: "text-red-500",
  },
];
const TopSellingProducts = [
  {
    productName: "hp pavilion 15-dk1030wm",
    sku: "SKU-10",
    unitSold: "1000",
  },
  {
    productName: "hp pavilion 15-dk1030wm",
    sku: "SKU-9",
    unitSold: "900",
  },
  {
    productName: "samsung s23 ultra",
    sku: "SKU-8",
    unitSold: "800",
  },
  {
    productName: "iphone 14 pro max",
    sku: "SKU-7",
    unitSold: "700",
  },
  {
    productName: "gaming laptop",
    sku: "SKU-6",
    unitSold: "600",
  },
  {
    productName: "office chair",
    sku: "SKU-5",
    unitSold: "500",
  },
  {
    productName: "4k ultra hd monitor",
    sku: "SKU-4",
    unitSold: "400",
  },

  {
    productName: "Hp elite 8500",
    sku: "SKU-3",
    unitSold: "300",
  },

  {
    productName: "smart watch",
    sku: "SKU-2",
    unitSold: "200",
  },
  {
    productName: "wireless headphone",
    sku: "SKU-1",
    unitSold: "100",
  },
];
const Cards = () => {
  return (
    <div className="w-full flex flex-col gap-8 ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4  px-5">
        {cardData.map((item, index) => (
          <Card key={index}>
            <CardContent className="text-sm">
              <CardTitle className="text-lg font-semibold flex items-center justify-between w-full">
                {item.title}
                <span>{item.icon}</span>
              </CardTitle>
              <div className={cn("flex items-center gap-2 w-full text-sm")}>
                <span className={item.color}>{item.value}</span>
                <span className="line-clamp-1">{item.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="w-full flex flex-wrap justify-between gap-8  ">
        {/* Recent sale  */}
        <Card className="max-w-xl w-[95%] mx-auto">
          <CardHeader className={"font-bold text-xl md:text-2xl"}>
            Top Selling Products
          </CardHeader>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Units Sold</TableHead>
              </TableRow>
            </TableHeader>

            {TopSellingProducts.map((item, index) => (
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium line-clamp-1">
                    {item.productName}
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.unitSold}</TableCell>
                  {/* <TableCell className="text-right">$250.00</TableCell> */}
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </Card>

        {/* Low stock alart  */}
        <Card className="max-w-md w-[95%] mx-auto md:mr-5">
          <CardHeader className={"font-bold text-xl md:text-2xl"}>
            Low Stock Products
          </CardHeader>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Units Sold</TableHead>
              </TableRow>
            </TableHeader>

            {TopSellingProducts.map((item, index) => (
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium line-clamp-1">
                    {item.productName}
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.unitSold}</TableCell>
                  {/* <TableCell className="text-right">$250.00</TableCell> */}
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Cards;
