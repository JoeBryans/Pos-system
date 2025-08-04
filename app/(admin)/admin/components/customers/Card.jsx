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
  UserRound,
  UsersRound,
  Star,
  Stars,
  Plus,
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
    title: "Total Customers",
    icon: <UsersRound size={15} color="blue" />,
    color: "text-blue-600",
    value: 1,
  },
  {
    title: "Active Customers",
    icon: <UsersRound size={15} color="green" />,
    color: "text-green-600",
    value: 1,
  },

  {
    title: "VIP Customers",
    icon: <Stars size={15} color="orange" />,
    color: "text-orange-500",
    value: 10,
  },

  {
    title: "Total Revenue",
    icon: <UsersRound size={15} color="gray" />,
    color: "text-gray-500",
    value: "$0.00",
  },
];
const CustomerCard = () => {
  const status = "Verified";
  return (
    <div className="w-full flex flex-wrap justify-between gap-2  ">
      <div className="w-[95%] flex flex-wrap items-center justify-between py-1.5  md:ml-5 px-5 rounded-lg ">
        <div className="space-y-2 mb-2">
          <h1 className={"font-bold text-xl md:text-2xl "}>
            Customer Management
          </h1>
          <span className="text-sm text-gray-600 dark:text-gray-50">
            Manage all customers and their details
          </span>
        </div>
        <div className="flex items-center md:gap-8 mt-2">
          {/* <Button
            variant={"secondary"}
            size={"lg"}
            className={"cursor-pointer"}
          >
            <DownloadIcon className="h-4 w-4" size={30} />
            Export
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            className={"cursor-pointer"}
          >
            <DownloadIcon className="h-4 w-4" size={30} />
            Export
          </Button> */}
          <Button variant={"primary"} size={"lg"} className={"cursor-pointer"}>
            <Plus className="h-4 w-4" size={30} />
            Add New Customer
          </Button>
        </div>
      </div>
      {/* analysis card */}

      <div className="w-full md:w-[98%] my-4  grid grid-cols-2 md:grid-cols-4 gap-4  max-auto px-5">
        {cardData.map((item, index) => (
          <Card key={index}>
            <CardContent className="text-sm space-y-3">
              <CardTitle className="text-lg font-semibold flex items-center justify-between w-full">
                {item.title}
                <span className={item.color}>{item.icon}</span>
              </CardTitle>
              <div className={cn("flex items-center gap-2 w-full text-sm")}>
                <span className={`text-lg `}>{item.value}</span>
                <span className="line-clamp-1">{item.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex w-[95%] mx-auto  flex-col gap-6">
        <Card className="w-full px-5 ">
          <div className="space-y-2 mb-2 ml-5">
            <h1 className={"font-bold text-xl md:text-2xl "}>
              Customer Details
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-50">
              All registered customer and their details
            </span>
          </div>
          <div className="flex flex-wrap  items-center gap-4">
            <div className="w-full  flex items-center  text-sm cursor-pointer mx-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 ">
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
          </div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Customer Name</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead className="">Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Loyalty Status</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Select</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            {[1]?.slice(0, 15)?.map((item, index) => (
              <TableBody>
                <TableRow>
                  <TableCell className="">John Doe</TableCell>

                  <TableCell className="font-medium ">
                    joined on 2023-05-01
                  </TableCell>
                  <TableCell className={" line-clamp-2 flex flex-col"}>
                    <span>+91-1234567890</span>
                    <span>JohnDoe@gmail.com</span>
                  </TableCell>
                  <TableCell className={"w-52 lex"} >
                    <Star size={15} color="orange" />
                    <span>10 Loyalty Points</span>
                  </TableCell>
                  <TableCell className={"w-44 line-clamp-2 flex flex-col"}>
                    <span>123 Main Street</span>
                    <span>New York, NY 10010</span>
                  </TableCell>
                  <TableCell>$0.00</TableCell>
                  <TableCell>1</TableCell>
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
                  <TableCell>
                    <Checkbox
                      id="toggle"
                      defaultChecked={false}
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                  </TableCell>
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
export default CustomerCard;
