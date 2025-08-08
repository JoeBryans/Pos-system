
import { BaggageClaim, Box, Group, House, PackageCheck, Scale, ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import path from "path";
import React from "react";
const Items = [
  {
    name: "New Products",
        id: "1",
    href:"/admin/products/new",
    description: "New Products",
    icon: <ShoppingCartIcon size={60} />,
  },
  {
    name: "New Brands",
    id: "2",
    href:"/admin/item-groups/brands",
    description: "New Brands",
    icon: <ShoppingBagIcon size={60} />,
  },
  {
    name: "New Categories",
      id: "3",
    href:"/admin/item-groups/categories",
    description: "New Categories",
    icon: <Group size={60} />,
  },
  // {
  //     name:"New Stock",
  //     id:"4",
  //     description:"New Stock",
  //     icon:"<NewStock size={20} />",
  // },
  {
    name: "New Units",
      id: "5",
    href:"/admin/item-groups/units",
    description: "New Customers",
    icon: <Scale size={60} />,
  },
  {
    name: "New Warehouses",
      id: "6",
    href:"/admin/item-groups/warehouses",
    description: "New Customers",
    icon: <House size={60} />,
  },
  {
    name: "Suppliers",
      id: "7",
    href:"/admin/item-groups/suppliers",
    description: "New Customers",
    icon: <BaggageClaim size={60} />,
  },
];
const page = () => {
  return (
    <div>
      <div className="grid grid-cols-3 mx-auto gap-8  h-[70vh] overflow-auto">
        {Items.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="flex flex-col border-2 items-center gap-4 justify-center cursor-pointer rounded-md border-dashed"
          >
            <h1 className=" font-bold text-xl md:text-2xl">{item.name}</h1>
            {item.icon}
            <span className="text-gray-600 dark:text-gray-300 font-semibold ">
              {item.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
