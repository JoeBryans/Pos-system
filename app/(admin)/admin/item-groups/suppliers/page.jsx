"use client";
import { Loader2 } from "lucide-react";
import { Button } from "../../../../../components/ui/button";

import { Input } from "../../../../../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { CreateSupplier } from "../../../../../actions/Supplier";
// import ImageUploader from "../../../../../components/ui/imageUploader";
const ProductSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  email: email().refine((value) => value.length > 2, {
    message: "Email must be longer than 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone number must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  paymentTems: z.string().min(2, {
    message: "Payment tems must be at least 2 characters.",
  }),
  code: z.string().min(2, {
    message: "Code must be at least 2 characters.",
  }),
});
export default function page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // form validation
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      code: "",
      paymentTems: "",
    },
  });

  // submit form
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await CreateSupplier(data);
      console.log(res);
      if (res?.ok) {
        setLoading(false);
        toast.success("supplier created successfully");
        router.refresh();
        return res;
      } else {
        setLoading(false);
        toast.error("supplier not created");
        return res;
      }
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong!");
      console.log(error);
    }
  };
  return (
    <div className="w-full mx-auto flex flex-col gap-8  ">
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
                    <FormLabel>Supplier Name</FormLabel>
                    <FormControl></FormControl>
                    <Input placeholder="Product name" {...field} />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Supplier Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className=" max-w-md w-full">
                    <FormLabel>Supplier Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="phone" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Supplier Address</FormLabel>
                    <FormControl>
                      <Input placeholder="address" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-wrap  items-center gap-4">
              <FormField
                controle={form.control}
                name="paymentTems"
                render={({ field }) => (
                  <FormItem className=" max-w-md w-full">
                    <FormLabel>Supplier Payment Tems</FormLabel>
                    <FormControl>
                      <Input placeholder="paymentTems" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className={"max-w-md w-full"}>
                    <FormLabel>Supplier Code</FormLabel>
                    <FormControl>
                      <Input placeholder="code" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              variant={"primary"}
              className={"cursor-pointer font-bold text-lg max-w-full w-96"}
            >
              Add Supplier
              {loading && <Loader2 className={"ml-2 animate-spin"} />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
