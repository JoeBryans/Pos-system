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
} from "lucide-react";
import { Category } from "../point-of-sale/Card";
import { cn } from "../../../../../lib/utils";
import { NewProduct } from "./NewProduct";
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
const ProductCard = () => {
  return (
    <div className="w-full flex flex-wrap justify-between gap-2  ">
      <div className=" w-[95%] flex flex-wrap items-center justify-between py-1.5  md:ml-5 md:px-5 rounded-lg ">
        <h1 className={"font-bold text-xl md:text-2xl ml-5"}>All Products </h1>

        <div className="flex items-center md:gap-8 mt-2">
          <Button
            variant={"secondary"}
            size={"lg"}
            className={"cursor-pointer"}
          >
            <DownloadIcon className="h-4 w-4" size={30} />
            Download Template
          </Button>
          {/*  category*/}
          {/* <Button variant={"primary"} size={"lg"} className={"cursor-pointer"}>
            <PlusIcon color="white" size={40} />
            Add New Product
          </Button> */}
          <NewProduct size="lg" variant={"primary"} label={"+ Add New Product"} />
        </div>
      </div>
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
      <Card className=" w-[95%] ml-5 px-5">
        <h1 className={"font-bold ml-5 text-xl md:text-2xl"}>
          Products Catalog
        </h1>
        <div className="shadow-md w-full flex flex-wrap items-center justify-between py-1.5  md:px-5 rounded-lg mx-auto ">
          <div className="w-max flex items-center  text-sm cursor-pointer mx-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 ">
            <Input
              placeholder="Search product"
              className="w-[400px]  rounded-none border-0 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none dark:text-white focus:ring-0 "
            />
            <Button variant={"primary"} size={"icon"}>
              <Search className="h-4 w-4" color="white" />
            </Button>
          </div>
          <div className="flex items-center gap-4 md:gap-8 mt-2 mx-auto">
            {/*  category*/}
            <Button variant={"outline"} className={"cursor-pointer"}>
              <BellRing />
              Reset
            </Button>
            <div>
              <Select className="w-[180px]">
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {Category.map((item, index) => (
                      <SelectItem value={item.title} key={index}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select className="w-[50px]">
                <SelectTrigger>
                  <SelectValue placeholder="More Filters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {Category.map((item, index) => (
                      <SelectItem value={item.title} key={index}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">S/No</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Sku</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
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
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell className={"space-x-2 flex "}>
                  
                  <NewProduct
                    variant="outline"
                    size={"icon"}
                    label={<Edit />}
                  />
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
      </Card>{" "}
    </div>
  );
};
export default ProductCard;
