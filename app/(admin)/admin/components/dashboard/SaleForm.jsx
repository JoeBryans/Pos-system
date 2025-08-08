"use client";
import { Camera, Loader2, PlusIcon } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
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
// import ImageUploader from "../../../../../components/ui/imageUploader";
import { Combobox } from "../../../../../components/ui/combobox";
const ProductSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be at least 2 characters.",
  }),
  sku: z.string().min(2, {
    message: "Sku must be at least 2 characters.",
  }),
  barcode: z.string().min(2, {
    message: "Barcode must be at least 2 characters.",
  }),
  price: z
    .string()
    .min(2)
    .transform((val) => Number(val), {
      message: "Price must be at least 2 characters.",
    }),
  category: z.string() .min(2, {
    message: "Category must be at least 2 characters.",
   }),
  stock: z.string().min(2, {
    message: "Stock must be at least 2 characters.",
  }),
  description: z.string(),
});
export function SaleForm({ label, variant, size, edit }) {
  const [Category, setCategory] = useState([]);
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
      price: 0,
      description: "",
      barcode: "",
      category: "",
      // stock:"",
      image_Url: "",
    },
  });
  // get categories
  useEffect(() => {
    async function getCategories() {
      try {
        const res = await GETCategory();
        setCategory(res);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={"cursor-pointer"}
          onClick={handleEdit}
        >
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Sale</DialogTitle>
          <DialogDescription>
            Make changes to your sale here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {" "}
            <div className="flex flex-col gap-8  h-[70vh] overflow-auto">
              <Combobox />
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
                    <FormItem className={"max-w-80 w-full"}>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input placeholder="Brand" {...field} />
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
                              {Category.map((item, index) => (
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
                    <FormItem className={"max-w-80 w-full"}>
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
                  name="price"
                  render={({ field }) => (
                    <FormItem className=" max-w-md w-full">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Price" {...field} type={"number"} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  controle={form.control}
                  name="barcode"
                  render={({ field }) => (
                    <FormItem className={"max-w-80 w-full"}>
                      <FormLabel>Barcode</FormLabel>
                      <FormControl>
                        <Input placeholder="Barcode" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                controle={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input placeholder="stock" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="product description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex flex-col relative  items-center gap-4 py-4 border-2 rounded-lg border-dashed">
                {
                  uploading && <div className="w-full absolute top-0 left-0 h-full flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <Loader2 size={40} className={"animate-spin"} />
                  </div>
                }
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
              {/* <ImageUploader open={open} setOpen={setOpen} /> */}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                variant={"primary"}
                className={"cursor-pointer"}
              >
                {editProduct ? "Update Product" : "Add Product"}{" "}
                {loading && <Loader2 className={"ml-2 animate-spin"} />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
