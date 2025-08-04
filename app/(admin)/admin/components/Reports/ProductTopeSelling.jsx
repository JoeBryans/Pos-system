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
// names of products and qty sold and revenue
const ProductRevenue = [
  {
    productName: "hp pavilion 15-dk1030wm",
    qtySold: 100,
    revenue: "$1000.00",
  },
  {
    productName: "hp pavilion 15-dk1030wm",
    qtySold: 100,
    revenue: "$1000.00",
  },
  {
    productName: "hp pavilion 15-dk1030wm",
    qtySold: 200,
    revenue: "$2000.00",
  },
  {
    productName: "hp pavilion 15-dk1030wm",
    qtySold: 300,
    revenue: "$3000.00",
  },
  {
    productName: "hp pavilion 15-dk1030wm",
    qtySold: 400,
    revenue: "$4000.00",
  },
  {
    productName: "hp pavilion 15-dk1030wm",
    qtySold: 500,
    revenue: "$5000.00",
  },
];

const ProductTopeSelling = () => {
  return (
    <div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="">Product</TableHead>
            <TableHead>Qty Sold</TableHead>
            <TableHead className="">Revenue</TableHead>
          </TableRow>
        </TableHeader>

        {ProductRevenue?.map((item, index) => (
          <TableBody key={index}>
            <TableRow>
              <TableCell className="">{item.productName}</TableCell>
              <TableCell>{item.qtySold}</TableCell>
              <TableCell>{item.revenue}</TableCell>

              {/* <TableCell className="text-right">$250.00</TableCell> */}
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default ProductTopeSelling;
