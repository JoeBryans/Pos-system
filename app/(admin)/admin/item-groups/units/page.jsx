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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateUnit } from "../../../../../actions/Unit";
import { Loader2 } from "lucide-react";

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
    const res = await CreateUnit(data);
    if (res?.ok) {
      setLoading(false);
      console.log("ok");
      toast.success("unit created successfully");
      form.setValue("name", "");
      form.setValue("description", "");
     

      router.refresh();
    } else {
      setLoading(false);
      toast.error("unit not created");unit
    }
  } catch (error) {
    setLoading(false);
    toast.error("unit not created");
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
            <span className="text-lg font-bold text-center">Add New Unit</span>

            <div className="w-full flex flex-col   gap-4">
              <FormField
                controle={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="  w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl></FormControl>
                    <Input placeholder="Product name" {...field} />

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
                      <Input placeholder="Product name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          <Button
            type="submit"
            variant={"primary"}
            className={"cursor-pointer w-full font font-bold text-lg"}
          >
            Add Unit
            {loading && <Loader2 className={"ml-2 animate-spin"} />}
          </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
