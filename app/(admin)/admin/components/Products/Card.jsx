"use client";
import React, { use, useEffect, useState } from "react";
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
  RefreshCcw,
} from "lucide-react";
import { Category } from "../point-of-sale/Card";
import { cn } from "../../../../../lib/utils";
import { NewProduct } from "./NewProduct";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";

import {
  DeletProduct,
  FilterProducts,
  GetProducts,
} from "../../../../../actions/Products";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageUploader from "../../../../../components/ui/imageUploader";

const ProductCard = ({ Products, Categories }) => {
  const [Product, setProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { products, totalProducts, sumPrice } = Products;
  const [cat, setCat] = useState("All");

  // filter products by category
  useEffect(() => {
    if (cat === "All") return;
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
  const cardData = [
    {
      title: "Total Products",
      description: "Total products for the last 30 days",
      icon: <PackageIcon size={15} color="blue" />,
      value: totalProducts,
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
      value: `$ ${sumPrice}`,
      color: "text-green-500",
    },
  ];

  // search products
  const handleSearch = useDebouncedCallback(async (e) => {
    setSearch(e.target.value);
    if (search === "") {
      return;
    }
    const res = await FilterProducts({ search: search });
    console.log("filteredProducts", res?.FilterProduct);
    setProduct(res?.FilterProduct);
  }, 500);

  // reset search and category
  const handleReset = async () => {
    setLoading(true);
    setSearch("");
    setCat("All");
    setLoading(false);

    router.push("/admin/products");
  };

  // delete product
  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      const res = await DeletProduct(id);
      console.log(res);
      if (res?.ok) {
        toast.success("Product deleted successfully");
        router.refresh();
        return res;
      } else {
        toast.error("Product not deleted");
        return res;
      }
    } catch (error) {
      console.log(error);
      toast.error("Product not deleted");
    }
  };

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
          <NewProduct
            size="lg"
            variant={"primary"}
            label={"+ Add New Product"}
          />
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
              <div
                className={cn("flex flex-col items-start gap-2 w-full text-sm")}
              >
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
        <div className=" w-full flex flex-wrap items-center justify-between py-1.5  md:px-5 rounded-lg mx-auto ">
          <div className="w-max flex items-center  text-sm cursor-pointer mx-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 ">
            <Button variant={"primary"} size={"icon"}>
              <Search className="h-4 w-4" color="white" />
            </Button>
            <Input
              placeholder="Search product"
              onChange={handleSearch}
              className="w-[400px]  rounded-none border-0 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none dark:text-white focus:ring-0 "
            />
          </div>
          <div className="flex items-center gap-4 md:gap-8 mt-2 mx-auto">
            {/*  category*/}
            <Button
              variant={"outline"}
              className={"cursor-pointer"}
              onClick={handleReset}
            >
              <RefreshCcw className={`${loading && "animate-spin"}`} />
              Reset
            </Button>
            <div>
              <Select
                className="w-[180px]"
                value={cat}
                onValueChange={(value) => setCat(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="All">All Category</SelectItem>
                    {Categories?.map((item, index) => (
                      <SelectItem value={item.name} key={index}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* <div>
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
            </div> */}
          </div>
        </div>

        {Product === null ? (
          <div>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Image</TableHead>
                  <TableHead className="">Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Sku</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Barcode</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              {products?.map((item, index) => (
                <TableBody key={index}>
                  <TableRow className={"space-x-4"}>
                    <TableCell className="w-44 h-20">
                      <Image
                        src={item?.images?.url[0]}
                        alt={item?.name}
                        width={500}
                        height={500}
                        className="rounded-md w-18 h-14 "
                      />
                    </TableCell>

                    <TableCell className="font-medium w-80 line-clamp-2">
                      {item.name}
                    </TableCell>
                    {/* <TableCell>{item.brand}</TableCell> */}
                    <TableCell>{item?.sku}</TableCell>
                    <TableCell>{item?.price}</TableCell>
                    <TableCell>{item?.category?.name}</TableCell>
                    <TableCell>{item?.stock?.quantity}</TableCell>
                    <TableCell>{item?.barcode}</TableCell>
                    <TableCell className={"space-x-2 flex "}>
                      <NewProduct
                        variant="outline"
                        size={"icon"}
                        edit={item?.id}
                        label={<Edit />}
                      />
                      <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => handleDelete(item?.id)}
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
          </div>
        ) : (
          <div>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Image</TableHead>
                  <TableHead className="">Name</TableHead>
                  {/* <TableHead>Brand</TableHead> */}
                  <TableHead>Sku</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Barcode</TableHead>
                  {/* <TableHead>Stock</TableHead> */}
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              {Product?.map((item, index) => (
                <TableBody key={index}>
                  <TableRow className={"space-x-4"}>
                    <TableCell className="w-44 h-20">
                      <Image
                        src={item?.images?.url[0]}
                        alt={item?.name}
                        width={500}
                        height={500}
                        className="rounded-md w-18 h-14 "
                      />
                    </TableCell>

                    <TableCell className="font-medium w-80 line-clamp-2">
                      {item.name}
                    </TableCell>
                    {/* <TableCell>{item.brand}</TableCell> */}
                    <TableCell>{item?.sku}</TableCell>
                    <TableCell>{item?.price}</TableCell>
                    <TableCell>{item?.category?.name}</TableCell>
                    <TableCell>{item?.stock?.quantity}</TableCell>
                    <TableCell>{item?.barcode}</TableCell>
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
          </div>
        )}
      </Card>
    </div>
  );
};
export default ProductCard;
