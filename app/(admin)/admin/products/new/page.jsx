import React from "react";
import { NewProduct } from "./Form";
import { GETBrand } from "../../../../../actions/Brand";
import { GETCategory } from "../../../../../actions/Categories";
const page = async() => {

  const [Brands, Categories] = await Promise.all([GETBrand(), GETCategory()]);
  console.log("Brands", Brands);
  console.log("Categories", Categories);
  // const []
  return (
    <div>
      <NewProduct />
    </div>
  );
};

export default page;
