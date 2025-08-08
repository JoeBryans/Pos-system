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
  Eye,
  ShoppingCartIcon,
  ChartLine,
  RefreshCcw,
} from "lucide-react";
import { cn } from "../../../../../lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/tabs";

const cardData = [
  {
    title: "Today Revenue",

    description: "Total Revenue from 1 transaction",
    icon: <DollarSign size={15} color="blue" />,
    value: "$10000.00",
    color: "text-blue-600",
  },
  {
    title: "Sales ",
    description: "Total completed transactions",
    icon: <ShoppingCartIcon size={15} color="orange" />,
    value: 1,
    color: "text-orange-300",
  },

  {
    title: "Average Sales",
    description: "per transaction",
    icon: <ChartLine size={15} color="red" />,
    value: "$5000.00",
    color: "text-red-500",
  },

  {
    title: "Pending Transactions",
    description: "Total pending transactions",
    icon: <ShoppingCartIcon size={15} color="red" />,
    value: 0,
    color: "text-red-500",
  },
   
];
const SalesCard = ({ Categories }) => {
  const status = "Verified";
  return (
    <div className="w-full flex flex-wrap justify-between gap-2  ">
      <div className="shadow-md w-[95%] flex flex-wrap items-center justify-between py-1.5  md:ml-5 px-5 rounded-lg ">
        <div className="space-y-2 mb-2">
          <h1 className={"font-bold text-xl md:text-2xl "}>Sales Management</h1>
          <span className="text-sm text-gray-600 dark:text-gray-50">
            Track and manage all sales transactions
          </span>
        </div>
        <div className="flex items-center md:gap-8 mt-2">
          <Button
            variant={"secondary"}
            size={"lg"}
            className={"cursor-pointer"}
          >
            <DownloadIcon className="h-4 w-4" size={30} />
            Export
          </Button>
        </div>
      </div>
      {/* analysis card */}

      <div className="w-full md:w-[98%] mb-4 md:px-5">
        <Tabs defaultValue="current-stock" className=" w-full px-5">
          <TabsList className={"w-full flex items-center justify-between"}>
            <span className="font-semibold  text-gray-600 dark:text-gray-50">
              Sales Overview
            </span>
            <div className="space-x-4">
              <TabsTrigger value="current-stock">Today</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent
            value="current-stock"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-auto px-5"
          >
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
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex w-[95%] mx-auto  flex-col gap-6">
        <Card className="w-full px-5 ">
          <div className="space-y-2 mb-2 ml-5">
            <h1 className={"font-bold text-xl md:text-2xl "}>
              Sales Transaction
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-50">
              All sales transaction and their details
            </span>
          </div>
          <div className="flex flex-wrap  items-center gap-4">
            <div className="w-full md:w-[55%] flex items-center  text-sm cursor-pointer mx-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 ">
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
            <div className="">
              <Select className="w-[180px]">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {Categories?.map((item, index) => (
                      <SelectItem value={item.name} key={index}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Select className="w-[180px]">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Today" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {Categories?.map((item, index) => (
                      <SelectItem value={item.title} key={index}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Sales No</TableHead>
                <TableHead className="">Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cashier</TableHead>

                <TableHead>Date/Time</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            {[1]?.map((item, index) => (
              <TableBody key={index}>
                <TableRow>
                  <TableCell className="">000456789</TableCell>

                  <TableCell className="font-medium line-clamp-1">
                    John Doe
                  </TableCell>
                  <TableCell>10 items</TableCell>
                  <TableCell>$1000.00</TableCell>
                  <TableCell>Cash</TableCell>
                  <TableCell>
                    <Button
                      variant={status === "Verified" ? "primary" : "outline"}
                      size={"sm"}
                      className={"cursor-pointer"}
                    >
                      Verified
                    </Button>
                  </TableCell>
                  {/* <TableCell>{item.price}</TableCell> */}
                  <TableCell> Stela</TableCell>
                  <TableCell>2023-05-01 10:00:00</TableCell>

                  <TableCell className={"space-x-2"}>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className={"cursor-pointer"}
                    >
                      <Eye />
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className={"cursor-pointer"}
                    >
                      <RefreshCcw />
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
export default SalesCard;
