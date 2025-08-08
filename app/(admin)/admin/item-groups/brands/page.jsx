"use client";
import React, { useState } from "react";
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
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { useRouter } from "next/navigation";
import { CreateBrand } from "../../../../../actions/Brand";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BrandSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
});

const page = () => {
const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(BrandSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await CreateBrand(data);
      if (res?.ok) {
        setLoading(false);
        console.log("ok");
        toast.success("brand created successfully");
        form.setValue("name", "");
        form.setValue("description", "");
        router.refresh();
      } else {
        setLoading(false);
        toast.error("brand not created");
      }
    } catch (error) {
      setLoading(false);
      toast.error("brand not created");
      console.log(error);
    }
  };
  return (
    <div className="w-full h-[80vh] mx-auto flex flex-col items-center justify-center gap-8  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full  shadow-md rounded-lg"
        >
          <div className="w-full flex flex-col gap-8  p-5">
            <span className="text-lg font-bold text-center">Add New Brand</span>

            <div className="w-full flex flex-col   gap-4">
              <FormField
                controle={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="  w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl></FormControl>
                    <Input placeholder="Brand name" {...field} />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                controle={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className={" w-full"}>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brand description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          <Button
            type="submit"
            variant={"primary"}
            className={"cursor-pointer w-full"}
          >
            Add Brand
            {loading && <Loader2 className={"ml-2 animate-spin"} />}
          </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
