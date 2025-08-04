import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { Products } from "../../../../../lib/products";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import {
  Search,
  Edit,
  Trash2,
  BellRing,
  PlusCircleIcon,
  PlusIcon,
  DownloadCloud,
  DownloadIcon,
  PackageIcon,
  DollarSign,
  Notebook,
  NotebookPen,
} from "lucide-react";
import { Category } from "../point-of-sale/Card";
import { cn } from "../../../../../lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/tabs";

const cardData = [
  {
    title: "Total Products",
    description: "Total products for the last 30 days",
    icon: <PackageIcon size={15} color="blue" />,
    value: 30,
    color: "text-blue-600",
  },
  {
    title: "Low Stock Products",
    description: "Total products for the last 30 days",
    icon: <PackageIcon size={15} color="orange" />,
    value: 10,
    color: "text-orange-300",
  },

  {
    title: "Out of Stock Products",
    description: "Total products for the last 30 days",
    icon: <PackageIcon size={15} color="red" />,
    value: 10,
    color: "text-red-500",
  },

  {
    title: "Total Value",
    description: "Total products for the last 30 days",
    icon: <DollarSign size={15} color="green" />,
    value: "$1,000,000",
    color: "text-green-500",
  },
];
const InventoryCard = () => {
  return (
    <div className="w-full flex flex-wrap justify-between gap-2  ">
      <div className="w-[95%] flex flex-wrap items-center justify-between py-1.5  md:ml-5 md:px-5 rounded-lg ">
        <div className="space-y-2 mb-2">
          <h1 className={"font-bold text-xl md:text-2xl "}>
            Inventory Management
          </h1>
          <span className="text-sm text-gray-600 dark:text-gray-50">
            Track and manage your stock levels
          </span>
        </div>
        <div className="flex items-center md:gap-8 mt-2">
          <Button
            variant={"secondary"}
            size={"lg"}
            className={"cursor-pointer"}
          >
            <NotebookPen className="h-4 w-4" size={30} />
            Stock Report
          </Button>
          {/*  category*/}
          <Button variant={"primary"} size={"lg"} className={"cursor-pointer"}>
            <PlusIcon color="white" size={40} />
            Stock Adjustment
          </Button>
        </div>
      </div>
      {/* analysis card */}
      <div className="w-[98%] mb-4 grid grid-cols-2 md:grid-cols-4 gap-4  px-5">
        {cardData.map((item, index) => (
          <Card key={index}>
            <CardContent className="text-sm space-y-3">
              <CardTitle className="text-lg font-semibold flex items-center justify-between w-full">
                {item.title}
                <span>{item.icon}</span>
              </CardTitle>
              <div className={cn("flex items-center gap-2 w-full text-sm")}>
                <span
                  className={`text-lg ${
                    item.value > 10 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {item.value}
                </span>
                <span className="line-clamp-1">{item.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex w-full  flex-col gap-6">
        <Tabs defaultValue="current-stock" className=" w-full px-5">
          <TabsList className={"ml-10"}>
            <TabsTrigger value="current-stock">Current Stock</TabsTrigger>
            <TabsTrigger value="stock-move">Stock Movement</TabsTrigger>
            <TabsTrigger value="alart">Alart & Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="current-stock" className=" w-full max-auto px-5">
            <Card className="w-full px-5 ">
              <div className="space-y-2 mb-2 ml-5">
                <h1 className={"font-bold text-xl md:text-2xl "}>
                  Inventory Overview
                </h1>
                <span className="text-sm text-gray-600 dark:text-gray-50">
                  Current stock levels and locations
                </span>
              </div>
              <div className="w-[95%] flex items-center  text-sm cursor-pointer mx-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 ">
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  className={"border-0 rounded-none shadow-none"}
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Search..."
                  className="w-full  rounded-none border-0 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none dark:text-white focus:ring-0 "
                />
              </div>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">S/No</TableHead>
                    <TableHead className="">Name</TableHead>
                    <TableHead>Sku</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>

                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                {Products?.slice(0, 15)?.map((item, index) => (
                  <TableBody key={index}>
                    <TableRow>
                      <TableCell className="">
                        <Checkbox
                          id="toggle"
                          defaultChecked={false}
                          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
                      </TableCell>

                      <TableCell className="font-medium line-clamp-1">
                        {item.name}
                      </TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>In Stock</TableCell>

                      <TableCell className={"space-x-2"}>
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          className={"cursor-pointer"}
                        >
                          Adjust Stock
                        </Button>
                       
                      </TableCell>
                      {/* <TableCell className="text-right">$250.00</TableCell> */}
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </Card>
          </TabsContent>
          <TabsContent value="stock-move"></TabsContent>
          <TabsContent value="alart"></TabsContent>
        </Tabs>
      </div>

      {/* inventory */}
    </div>
  );
};
export default InventoryCard;
