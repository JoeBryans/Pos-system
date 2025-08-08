import React from "react";
import POSCard from "../components/point-of-sale/Card";
import { GetProducts } from "../../../../actions/Products";
import { GETCategory } from "../../../../actions/Categories";

const page = async() => {
  const Products = await GetProducts();
  const Categories=await GETCategory();
  return (
    <div>
      <POSCard Products={Products} Categories={Categories} />
    </div>
  );
};

export default page;
