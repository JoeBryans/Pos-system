"use client";
import React, { useState } from "react";
import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react";

import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { Input } from "../../../../../components/ui/input";
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
import { useRouter } from "next/navigation";
// import { CreateAdjustment } from "../../../../../actions/Adjustment";
import { toast } from "sonner";
import { Combobox } from "../../../../../components/ui/combobox";
import { StockAdjustment } from "../../../../../actions/Inventory";

const AdjustmentSchema = z.object({
  adjustQuantity: z
    .string()
    .min(1)
    .transform((val) => Number(val), {
      message: "Price must be at least 2 characters.",
    }),
  avaliableQuantity: z
    .string()
    .min(1)
    .transform((val) => Number(val), {
      message: "Price must be at least 2 characters.",
    }),
  reference: z
    .string()
    .min(1, { message: "Reference must be at least 2 characters." }),
  reason: z.string(),
  description: z.string(),
  note: z.string(),
  warehouseId: z.string().min(2, {
    message: "Warehouse must be at least 2 characters.",
  }),
});

const AddingStock = ({ products, warehouse }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(AdjustmentSchema),
    defaultValues: {
      adjustQuantity: "0",
      avaliableQuantity: "0",
      reference: "",
      reason: "",
      description: "",
      note: "",
      warehouseId: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("data", data);

      try {
        setLoading(true);
        const res = await StockAdjustment(data, value);
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
      } catch (error) {
        setLoading(false);
        toast.error("product not created");
        console.log(error);
      }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Adjustment of Stock</CardTitle>
          <CardDescription>
            Make changes to your stock here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="w-full grid gap-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2xl mt-10 shadow-md rounded-md p-8 dark:bg-gray-900 dark:border dark:border-gray-700 dark:shadow-gray-700/50 mx-auto"
              >
                <div className="flex flex-col gap-8  overflow-auto">
                  <div className="w-full space-y-8">
                    <span className="text-sm font-semibold">
                      Select Product
                    </span>
                    <Combobox
                      products={products}
                      value={value}
                      setValue={setValue}
                    />
                  </div>
                  <div className="w-full flex flex-wrap  items-center gap-4">
                    <FormField
                      controle={form.control}
                      name="warehouseId"
                      render={({ field }) => (
                        <FormItem className=" max-w-72 w-full">
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
                      name="avaliableQuantity"
                      render={({ field }) => (
                        <FormItem className=" max-w-72 w-full">
                          <FormLabel>Available Quantity</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Available Quantity"
                              {...field}
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
                      name="reference"
                      render={({ field }) => (
                        <FormItem className={"max-w-72 w-full"}>
                          <FormLabel>Reference No</FormLabel>
                          <FormControl>
                            <Input placeholder="refrence number" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      controle={form.control}
                      name="adjustQuantity"
                      render={({ field }) => (
                        <FormItem className={"max-w-72 w-full"}>
                          <FormLabel>Adjust Quantity</FormLabel>
                          <FormControl>
                            <Input placeholder="Adjust Quantity" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    controle={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem className={" w-full"}>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Textarea placeholder="note" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    controle={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className={"w-full"}>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="description"
                            {...field}
                            className={"w-full"}
                          />
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
                    Save
                    {loading && <Loader2 className={"ml-2 animate-spin"} />}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddingStock;
