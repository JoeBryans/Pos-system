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
  RockingChair,
  RefreshCcw,
  Network,
  Box,
  LineChart,
  BarChart,
} from "lucide-react";
import { Category } from "../point-of-sale/Card";
import { cn } from "../../../../../lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/tabs";
import SummaryChart from "./Charts";

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
const ProfitCard = () => {
  const status = "Verified";
  return (
    <div className="w-full flex flex-wrap justify-between gap-2  ">
      <div className=" w-[95%] flex flex-wrap items-center justify-between py-1.5  md:ml-5 px-5 rounded-lg ">
        <div className="space-y-2 mb-2">
          <h1 className={"font-bold text-xl md:text-2xl "}>Profit Analytics</h1>
          <span className="text-sm text-gray-600 dark:text-gray-50">
            Track your business profitability over time
          </span>
        </div>
        <div className="flex items-center md:gap-8 mt-2">
          <Button
            variant={"secondary"}
            size={"lg"}
            className={"cursor-pointer"}
          >
            <RefreshCcw className="h-4 w-4" size={30} />
            Refresh
          </Button>
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
        <Tabs defaultValue="today" className=" w-full px-5">
          <TabsList
            className={
              "w-[98%] h-max mx-auto  px-10 flex  items-center justify-between gap-4"
            }
          >
            <span className="font-semibold  text-gray-600 dark:text-gray-50">
              Profit Period
            </span>
            <div className="space-x-4 text-xs">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
              <TabsTrigger value="all">Custom Range</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="today">
            <Tabs defaultValue="summary" className=" w-full px-5">
              <TabsList>
                <div className="space-x-4 text-xs">
                  <TabsTrigger value="summary">
                    <BarChart />
                    summary
                  </TabsTrigger>
                  <TabsTrigger value="products">
                    <Box />
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="trend">
                    <LineChart />
                    Trend
                  </TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="summary">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-auto px-5">
                  {cardData.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="text-sm space-y-3">
                        <CardTitle className="text-lg font-semibold flex items-center justify-between w-full">
                          {item.title}
                          <span>{item.icon}</span>
                        </CardTitle>
                        <div
                          className={cn(
                            "flex items-center gap-2 w-full text-sm"
                          )}
                        >
                          <span
                            className={`text-lg ${
                              item.value > 10
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {item.value}
                          </span>
                          <span className="line-clamp-1">
                            {item.description}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className={"w-full my-10"}>
                  <CardHeader>
                    <h1 className="text-xl font-bold"> Profit Over Time</h1>
                    <span className="text-sm text-gray-600 dark:text-gray-50 font-semibold">
                      Your Profit Over Today
                    </span>
                  </CardHeader>
                  <CardContent className={"my-5 w-full"}>
                    <SummaryChart />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>

    
      {/* inventory */}
    </div>
  );
};
export default ProfitCard;
