"use client";
import { Camera, Loader2, PlusIcon } from "lucide-react";
import { Button } from "../../../../../components/ui/button";

import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Textarea } from "../../../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { useEffect, useState } from "react";
import { GETCategory } from "../../../../../actions/Categories";
import { toast, Toaster } from "sonner";
import {
  CreateProduct,
  GetSingleProduct,
  updateProduct,
} from "../../../../../actions/Products";
import { useRouter } from "next/navigation";
import ImageUploader from "../../../../../components/ui/imageUploader";
import { GETBrand } from "../../../../../actions/Brand";
import { GETWareHouse } from "../../../../../actions/WareHouse";
import { GETUnit } from "../../../../../actions/Unit";
import { GETSupplier } from "../../../../../actions/Supplier";
const ProductSchema = z.object({
  name: z.string().toLowerCase().trim().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be at least 2 characters.",
  }),
  sku: z.string().toLowerCase().trim().min(2, {
    message: "Sku must be at least 2 characters.",
  }),
  barcode: z.string().toLowerCase().trim(),
  buyingPrice: z
    .string()
    .min(2)
    .transform((val) => Number(val), {
      message: "Price must be at least 2 characters.",
    }),
  sellingPrice: z
    .string()
    .min(2)
    .transform((val) => Number(val), {
      message: "Price must be at least 2 characters.",
    }),
  category: z.string().toLowerCase().trim().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  unitId: z.string(),
  warehouseId: z.string(),
  dimensions: z.string().toLowerCase().trim(),
  weight: z.string().transform((val) => Number(val)),
  lowStock: z.string().toLowerCase().trim().transform((val) => Number(val)),
  discount: z.string().transform((val) => Number(val)),
  supplierId: z.string().min(2, {
    message: "Supplier must be at least 2 characters.",
  }),
    taxRate: z.string().transform((val) => Number(val)),
  //   notes: z.string().min(2, {
  //     message: "Notes must be at least 2 characters.",
  //   }),

  stock: z.string().min(2, {
    message: "Stock must be at least 2 characters.",
  }),
  description: z.string(),
});
export function NewProduct() {
  const [Category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [warehouse, setWareHouse] = useState([]);
  const [unit, setUnit] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  console.log("imageUrl", imageUrl);

  // form validation
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      sku: "",
      buyingPrice: "0",
      sellingPrice: "0",
      description: "",
      barcode: "",
      category: "",
      warehouseId: "",
      unitId: "",
      discount: "",
      lowStock: "",
      stock: "",
      weight: "0",
      taxRate: "0",
      // notes: "",
      supplierId: "",
      dimensions: "",
      // location: "",
      brand: "",
      // categoryId: "",
    },
  });
  // get categories
  useEffect(() => {
    async function getCategories() {
      try {
        const [Brands, Categories, Warehouse, Unit,Supplier] =
          await Promise.all([
            GETBrand(),
            GETCategory(),
            GETWareHouse(),
            GETUnit(),
            GETSupplier(),
          ]);
        // console.log("Warehouse", Warehouse);
        // console.log("Categories", Categories);
        // console.log("Brands", Brands);
        // console.log("Unit", Categories);

        // console.log("Brands", Brands);
        // console.log("Categories", Categories);
        setWareHouse(Warehouse);
        setSupplier(Supplier);
        setUnit(Unit);
        setBrand(Brands);
        setCategory(Categories);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, []);

  // upload image
  const handleFiles = async (e) => {
    const files = e.target.files;
    const uploadPreset = "your_unsigned_preset"; // Replace
    const cloudName = "your_cloud_name"; // Replace

    setUploading(true);
    const uploadedImages = [];

    for (let file of files) {
      console.log("file:", file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "inventory");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      uploadedImages.push(data.secure_url);
    }
    console.log("uploaded", uploadedImages);

    setImageUrl(uploadedImages);
    setUploading(false);
  };

  // edit product
  const handleEdit = async () => {
    console.log("edit", edit);
    if (!edit) return;
    setEditProduct(true);
    const res = await GetSingleProduct(edit);
    console.log(res);
    const price = JSON.stringify(res?.price);
    console.log("price", price);

    form.setValue("name", res?.name);
    form.setValue("category", res?.category?.id);
    form.setValue("sku", res?.sku);
    form.setValue("price", price);
    form.setValue("description", res?.description);
    form.setValue("image_Url", res?.imageUrl);
  };
  // submit form
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (editProduct) {
        const res = await updateProduct(edit, data);
        console.log(res);
        if (res?.ok) {
          setLoading(false);
          toast.success("product updated successfully");
          router.refresh();
          return res;
        } else {
          setLoading(false);
          toast.error("product not updated");
          return res;
        }
      } else {
        const res = await CreateProduct(data, imageUrl);
        console.log(res);
        if (res?.ok) {
          setLoading(false);
          toast.success("product created successfully");
          router.refresh();
          return res;
        } else {
          setLoading(false);
          toast.error("product not created");
          return res;
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("product not created");
      console.log(error);
    }
  };
  return (
    <div className="w-full min-h-[100vh] mx-auto flex flex-col gap-8  mb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {" "}
          <div className="max-w-5xl w-full flex flex-col gap-8 shadow-md rounded-lg p-5">
            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=" max-w-md w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl></FormControl>
                    <Input placeholder="Product name" {...field} />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className=" max-w-md w-full">
                          <SelectValue placeholder="Brand" />
                        </SelectTrigger>
                        <SelectContent className="">
                          <SelectGroup>
                            <SelectLabel>Brand</SelectLabel>
                            {brand?.map((item, index) => (
                              <SelectItem value={item.id} key={index}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="warehouseId"
                render={({ field }) => (
                  <FormItem className=" max-w-md w-full">
                    <FormLabel>Warehouse</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className=" max-w-md w-full">
                          <SelectValue placeholder="Warehouse" />
                        </SelectTrigger>
                        <SelectContent className="">
                          <SelectGroup>
                            <SelectLabel>Warehouse</SelectLabel>
                            {warehouse?.map((item, index) => (
                              <SelectItem value={item.id} key={index}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="unitId"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Units</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className=" max-w-md w-full">
                          <SelectValue placeholder="Units" />
                        </SelectTrigger>
                        <SelectContent className="">
                          <SelectGroup>
                            <SelectLabel>Units</SelectLabel>
                            {unit?.map((item, index) => (
                              <SelectItem value={item.id} key={index}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className=" max-w-md w-full">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className=" max-w-md w-full">
                          <SelectValue placeholder="Categories" />
                        </SelectTrigger>
                        <SelectContent className="">
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {Category?.map((item, index) => (
                              <SelectItem value={item.id} key={index}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Sku</FormLabel>
                    <FormControl>
                      <Input placeholder="Sku" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="buyingPrice"
                render={({ field }) => (
                  <FormItem className=" max-w-md w-full">
                    <FormLabel>Buying Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Price" {...field} type={"number"} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Selling Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="selling price"
                        {...field}
                        type={"number"}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="discount"
                        {...field}
                        type={"number"}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input placeholder="stock" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem className=" max-w-md w-full">
                    <FormLabel>Supplier</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className=" max-w-md w-full">
                          <SelectValue placeholder="Categories" />
                        </SelectTrigger>
                        <SelectContent className="">
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {supplier?.map((item, index) => (
                              <SelectItem value={item.id} key={index}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="taxRate"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Tax Rate </FormLabel>
                    <FormControl>
                      <Input placeholder="Tax Rate" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="lowStock"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Low Stock</FormLabel>
                    <FormControl>
                      <Input placeholder="low stock" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Barcode</FormLabel>
                    <FormControl>
                      <Input placeholder="Barcode" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="dimensions"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Dimensions</FormLabel>
                    <FormControl>
                      <Input placeholder="dimensions" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Weight in Kg</FormLabel>
                    <FormControl>
                      <Input placeholder="Weight in Kg" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="product description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="max-w-md w-full flex flex-col relative  items-center gap-4 py-4 border-2 rounded-lg border-dashed">
                {uploading && (
                  <div className="w-full absolute top-0 left-0 h-full flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <Loader2 size={40} className={"animate-spin"} />
                  </div>
                )}
                <span className="text-xs">Upload Image</span>
                <Label htmlFor={"file"} className={"cursor-pointer"}>
                  <Camera size={40} />
                </Label>
                <Input
                  id={"file"}
                  type={"file"}
                  multiple
                  maxfiles={10}
                  onChange={handleFiles}
                  placeholder="image url"
                  className={"hidden"}
                />
                <p className="text-xs">Your are to upload maximum 10 images</p>
              </div>
            </div>
            {/* <ImageUploader open={open} setOpen={setOpen} /> */}
            <Button
              type="submit"
              variant={"primary"}
              className={"cursor-pointer font-bold text-lg w-md"}
            >
              {editProduct ? "Update Product" : "Add Product"}{" "}
              {loading && <Loader2 className={"ml-2 animate-spin"} />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
