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
const CategoriesCard = () => {
  return (
    <div className="w-full flex flex-wrap justify-between gap-2  ">
      <div className=" w-[95%] flex flex-wrap items-center justify-between py-1.5  md:ml-5 md:px-5 rounded-lg ">
        <div className="space-y-2 mb-2">
          <h1 className={"font-bold text-xl md:text-2xl "}>Categories</h1>
          <span className="text-sm text-gray-600 dark:text-gray-50">
            Manage your product categories
          </span>
        </div>
        <div className="flex items-center md:gap-8 mt-2">
          {/*  category*/}
          <Button variant={"primary"} size={"lg"} className={"cursor-pointer"}>
            <PlusIcon color="white" size={40} />
            Add New Category
          </Button>
        </div>
      </div>

      <div className="flex w-full  flex-col gap-6">
        <Card className="w-[95%]  ml-5 px-5 ">
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
                <TableHead className="">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Orders</TableHead>

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            {Products?.slice(0, 15)?.map((item, index) => (
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium ">
                    {item.category}
                  </TableCell>
                  <TableCell className={" line-clamp-1"}>
                    {item.description}
                  </TableCell>
                  <TableCell>
                    <Button variant={"primary"} size={"sm"}>
                      Active
                    </Button>
                  </TableCell>
                  <TableCell>143</TableCell>
                  <TableCell>14</TableCell>

                  <TableCell className={"space-x-2"}>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className={"cursor-pointer"}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className={"cursor-pointer"}
                    >
                      <Trash2 color="red" />
                    </Button>
                  </TableCell>
                  {/* <TableCell className="text-right">$250.00</TableCell> */}
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </Card>
      </div>

      {/* inventory */}
    </div>
  );
};
export default CategoriesCard;
