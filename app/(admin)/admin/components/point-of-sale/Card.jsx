import { Search } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
} from "../../../../../components/ui/card";
import { Products } from "../../../../../lib/products";
import React from "react";
import { Input } from "../../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import Orders from "./orders";
export const Category = [
  {
    title: "Fashion",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/71qcoYgEhzL._SX3000_.jpg",
  },
  {
    title: "Phone and Tablet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/71xHyqBwdcL._SX3000_.jpg",
  },
  {
    title: "Laptop and Accessories",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/81hIlE5xocL._SX3000_.jpg",
  },
  {
    title: "Electronics",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/619geyiQI5L._SX3000_.jpg",
  },
  {
    title: "Home and Office",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/61Yx5-N155L._SX3000_.jpg",
  },
  {
    title: "Jewelry",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/61Yx5-N155L._SX3000_.jpg",
  },
  {
    title: "Grocery",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/61Yx5-N155L._SX3000_.jpg",
  },

  {
    title: "Sports and Outdoor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/61Yx5-N155L._SX3000_.jpg",
  },
];
const POSCard = () => {
  // const total = Products.length
  // console.log(total);
  return (
    <div className="w-full ">
      <div className=" w-[95%] grid grid-cols-2 md:grid-cols-4 gap-5 py-1.5 mb-10 md:ml-5 md:px-5 rounded-lg ">
        <h1 className=" ml-5 font-bold text-xl md:text-2xl">POS System</h1>
        {/* <div className="flex  items-center gap-8"> */}
        <div className="w-44 flex items-center  text-sm cursor-pointer mx-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 ">
          <Input
            placeholder="Scan barcode..."
            className="w-44  rounded-none border-0 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none dark:text-white focus:ring-0 "
          />
          <Button variant={"primary"} size={"icon"}>
            <Search className="h-4 w-4" color="white" />
          </Button>
        </div>
        <div className="w-44 flex items-center  text-sm cursor-pointer mx-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 ">
          <Input
            placeholder="Search product"
            className="w-44  rounded-none border-0 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none dark:text-white focus:ring-0 "
          />
          <Button variant={"primary"} size={"icon"}>
            {" "}
            <Search className="h-4 w-4" color="white" />
          </Button>
        </div>
        {/*  category*/}
        <div className="">
          <Select className="w-[180px]">
            <SelectTrigger className="w-[180px]">
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
      </div>
      {/* </div> */}

      <div className="w-full flex flex-wrap justify-between gap-4  ">
        {/* Recent sale  */}
        <Card className="max-w-3xl w-[95%] md:ml-5 grid grid-cols-2 md:grid-cols-3 px-5 gap-4">
          {Products.map((item, index) => (
            <Card
              key={index}
              className={"w-44 md:w-52 h-[320px] overflow-hidden group "}
            >
              <div className="-mt-6 relative max-h-32 w-full bg-indigo-200 group-hover:scale-125 transition-all ease-in-out duration-300">
                <img
                  className="w-full h-full object-cover"
                  src={item?.image_url}
                  alt={item?.name}
                />
              </div>
              <CardContent className="text-s items-start flex flex-col gap-2">
                {/* Product Details Section */}
                <div className="w-full">
                  {/* Product Brand */}
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {item?.brand}
                  </p>

                  {/* Product Name */}
                  <h2 className="mt-2 text-xl font-bold line-clamp-1 ">
                    {item?.name}
                  </h2>

                  {/* Product Description */}
                  {/* <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {item?.description}
                </p> */}

                  {/* Price and Stock Information */}
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-2xl font-bold ">
                      ${item?.price.toFixed(2)}
                    </span>
                  </div>

                  {/* "Add to Cart" Button */}
                  <Button variant={"primary"} className={"w-full mt-4"}>
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </Card>

        {/* order */}

        <Card className={"w-[95%] md:w-[350px] px-4 mr-5 h-max pb-8 mx-auto"}>
          <Orders />
        </Card>
      </div>
    </div>
  );
};

export default POSCard;
