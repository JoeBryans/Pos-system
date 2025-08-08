import React from "react";
import SalesCard from "../components/sales/Card";
import { GETCategory } from "../../../../actions/Categories";

const page =async() => {
  const Categories=await GETCategory();
  return (
    <div>
      <SalesCard Categories={Categories} />
    </div>
  );
};

export default page;
