"use client";
import { Camera, Loader2, PlusIcon } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { useEffect, useState } from "react";
import { GETCategory } from "../../../../../actions/Categories";
import { toast, Toaster } from "sonner";
import {
  CreateProduct,
  GetProducts,
  GetSingleProduct,
  updateProduct,
} from "../../../../../actions/Products";
import { useRouter } from "next/navigation";
import { Combobox } from "../../../../../components/ui/combobox";
import { CreateSales } from "../../../../../actions/Sales";
const ProductSchema = z.object({
  salePrice: z
    .string()
    .min(1)
    .transform((val) => Number(val), {
      message: "Price must be at least 2 characters.",
    }),
  quantity: z
    .string()
    .min(1)
    .transform((val) => Number(val), {
      message: "Price must be at least 2 characters.",
    }),
});
export default function SaleForm() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [uploading, setUploading] = useState(false);
  // combobox value
  const [value, setValue] = useState("");

  const router = useRouter();

  // form validation
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      quantity: 0,
      salePrice: 0,
    },
  });
  // get products
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await GetProducts();
        setProducts(res?.products);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  // edit product
  //   const handleEdit = async () => {
  //     console.log("edit", edit);
  //     if (!edit) return;
  //     setEditProduct(true);
  //     const res = await GetSingleProduct(edit);
  //     console.log(res);
  //     const price = JSON.stringify(res?.price);
  //     console.log("price", price);

  //     form.setValue("name", res?.name);
  //     form.setValue("category", res?.category?.id);
  //     form.setValue("sku", res?.sku);
  //     form.setValue("price", price);
  //     form.setValue("description", res?.description);
  //     form.setValue("image_Url", res?.imageUrl);
  //   };

  // submit form
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await CreateSales(data, value);
      console.log(res);
      if (res?.ok) {
        setLoading(false);
          toast.success("product created successfully");
          form.setValue("salePrice", "");
          form.setValue("quantity", "");    
        router.refresh();
        return res;
      } else {
        setLoading(false);
        toast.error("product not created");
        return res;
      }
    } catch (error) {
      setLoading(false);
      toast.error("product not created");
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center gap-8 mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-xl mt-10 shadow-md rounded-md p-8 dark:bg-gray-900 dark:border dark:border-gray-700 dark:shadow-gray-700/50 mx-auto"
        >
          <div className="flex flex-col gap-8  overflow-auto">
            <div className="w-full">
              <span className="text-sm font-semibold">Select Product</span>
              <Combobox products={products} value={value} setValue={setValue} />
            </div>
            <FormField
              controle={form.control}
              name="salePrice"
              render={({ field }) => (
                <FormItem className="  w-full">
                  <FormLabel> Sale Price</FormLabel>
                  <FormControl></FormControl>
                  <Input placeholder="Sale Price" {...field} type={"number"} />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              controle={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className={" w-full"}>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="quantity" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant={"primary"}
              className={"cursor-pointer font-bold text-lg"}
            >
              Add Sale
              {loading && <Loader2 className={"ml-2 animate-spin"} />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
