import React from "react";
import ProductCard from "../components/Products/Card";
import { GetProducts } from "../../../../actions/Products";
import { GETCategory } from "../../../../actions/Categories";

const page = async () => {
  const Products = await GetProducts();

  const Categories = await GETCategory();
  // const [Products, Categories] = await Promise.all([GetProducts(), GETCategory()]);
  console.log("Products", Products);
  return (
    <div>
      {/* <ProductCard Categories={Categories} /> */}
      <ProductCard Products={Products} Categories={Categories} />
    </div>
  );
};

export default page;
