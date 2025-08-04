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
import  {MyChart, AreaCharts } from "./Rechart";
import ProductTopeSelling from "./ProductTopeSelling";
import ProductRevenueChart from "./ProductRevenueChart";

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
const ReportCard = () => {
  const status = "Verified";
  return (
    <div className="w-full flex flex-wrap justify-between gap-2  ">
      <div className="ml-10 space-y-2 mb-2">
        <h1 className={"font-bold text-xl md:text-2xl "}>
          Report and Analytics
        </h1>
        <span className="text-sm text-gray-600 dark:text-gray-50">
          Business insights and performance metrics
        </span>
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

      {/* Report Table */}
      <div className="flex w-full  flex-col gap-6">
        <Tabs defaultValue="sales" className=" w-full px-5">
          <TabsList className={"ml-10"}>
            <TabsTrigger value="sales">Sales Trend</TabsTrigger>
            <TabsTrigger value="product-performance">
              Product Performance
            </TabsTrigger>
            {/* <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger> */}
          </TabsList>
          <TabsContent value="sales" className=" w-full max-auto px-5">
            <Card>
              <CardHeader>
                <h1 className="text-xl font-bold">Sale Trend</h1>
                <span className="text-sm text-gray-600 dark:text-gray-50 font-semibold">
                  Revenue and sales over time
                </span>
              </CardHeader>
              <CardContent className={"my-5 w-full"}>
                <MyChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            value="product-performance"
            className={"my-5 w-full flex flex-wrap gap-8"}
          >
            <Card className="lg:w-[50%] w-full">
              <CardHeader>
                <h1 className="text-xl font-bold">Top Selling Product </h1>
                <span className="text-sm text-gray-600 dark:text-gray-50 font-semibold">
                  Best performing product by revenue
                </span>
              </CardHeader>
              <CardContent>
                <ProductTopeSelling />
              </CardContent>
            </Card>
            <Card className="lg:w-[40%]  w-full ">
              <CardHeader>
                <h1 className="text-xl font-bold">
                  Product Revenue and Distribution
                </h1>
                <span className="text-sm text-gray-600 dark:text-gray-50 font-semibold">
                  Revenue breakdown by product
                </span>
              </CardHeader>
              <CardContent>
                <ProductRevenueChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payment-methods"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default ReportCard;
