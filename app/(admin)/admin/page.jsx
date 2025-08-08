import { Button } from "../../../components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
import Cards from "./components/dashboard/Cards";
import { SaleForm } from "./components/dashboard/SaleForm";

const page = () => {
  return (
    <div className=" min-h-[100vh] w-full relative mb-20">
      <div className="flex items-center justify-between w-full px-10">
        <div>
          <h1 className=" font-bold text-xl md:text-2xl">Dashboard</h1>
          <span className="text-gray-600 dark:text-gray-300 font-semibold ">
            Welcome back! here is your business overview
          </span>
        </div>

        <div>
          <SaleForm label={"+ New Sale"} variant={"primary"} size={"lg"} />
          {/* <Button variant={"primary"} size={"lg"}>
            <PlusIcon size={30} /> New Sale
          </Button> */}
        </div>
      </div>
      {/* cards */}
      <div className="w-full mt-5">
        <Cards />
      </div>
    </div>
  );
};

export default page;
