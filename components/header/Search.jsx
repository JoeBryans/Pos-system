import React from "react";
import { Cartegories } from "./Category/cartegories";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";

const Searchs = ({ className }) => {
  return (
    <div
      className={cn(
        "flex items-center border overflow-hidden border-indigo-600 dark:border-gray-700 rounded-xl  ",
        className
      )}
    >
      <Cartegories />
      <Input
        placeholder="Search..."
        className="w-96 md:w-xl rounded-none border-0 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none dark:text-white focus:ring-0 "
      />
      <Button
        variant={"primary"}
        size={"icon"}
        className="rounded-none cursor-pointer "
      >
        <Search className="h-4 w-4" color="white" />
      </Button>
    </div>
  );
};

export default Searchs;
