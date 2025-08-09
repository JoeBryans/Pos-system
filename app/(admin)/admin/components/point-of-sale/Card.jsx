"use client";
import { Search } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
} from "../../../../../components/ui/card";
// import { Products } from "../../../../../lib/products";
import React, { use, useEffect, useState } from "react";
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
import { FilterProducts } from "../../../../../actions/Products";
import { useDebouncedCallback } from "use-debounce";
import Image from "next/image";

const POSCard = ({ Products, Categories }) => {
  const products = Products.products;
  const [Product, setProduct] = useState(products || []);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  console.log(Product);
  console.log("search :", search);

  //  filter products by category
  useEffect(() => {
    if (cat === "All") {
      setProduct(products || []);
      return;
    }
    async function getCategories() {
      try {
        const res = await FilterProducts({ category: cat });
        setProduct(res?.products);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, [cat]);

  const handSearch = useDebouncedCallback(async (e) => {
    try {
      setSearch(e.target.value);
      if (search === "") {
        setProduct(products || []);
      }
      const res = await FilterProducts({ search: search });
      console.log("filteredProducts", res?.FilterProduct);
      setProduct(res?.FilterProduct);
    } catch (error) {
      console.log(error);
      return error;
    }
  }, 500);

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
        {/* search products */}
        <div className="w-44 flex items-center  text-sm cursor-pointer mx-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 ">
          <Button variant={"secondary"} size={"icon"}>
            <Search className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Search product"
            onChange={handSearch}
            className="w-44  rounded-none border-0 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none dark:text-white focus:ring-0 "
          />
        </div>
        {/*  category*/}
        <div className="">
          <Select
            className="w-[180px]"
            value={cat}
            onValueChange={(value) => setCat(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="All">All Category</SelectItem>

                {Categories?.map((item, index) => (
                  <SelectItem value={item?.name} key={index}>
                    {item?.name}
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
          {Product?.map((item, index) => (
            <Card
              key={index}
              className={"w-44 md:w-52 h-[320px] overflow-hidden group "}
            >
              <div className="-mt-6 relative max-h-32 w-full bg-indigo-200 group-hover:scale-125 transition-all ease-in-out duration-300">
                <Image
                  className="w-full h-32 "
                  src={item?.images?.url[0]}
                  alt={item?.name}
                  width={500}
                  height={500}
                />
              </div>
              <CardContent className="text-sm items-start flex flex-col gap-2">
                {/* Product Details Section */}
                <div className="w-full">
                  {/* Product Brand */}
                  {/* <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {item?.brand}
                  </p> */}

                  {/* Product Name */}
                  <h2 className=" text-md font-bold line-clamp-2 ">
                    {item?.name}
                  </h2>

                  {/* Product Description */}
                  {/* <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {item?.description}
                </p> */}

                  {/* Price and Stock Information */}
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-md font-bold ">
                      ${item?.sellingPrice.toFixed(2)}
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
