import {
  Card,
  CardContent,
  CardTitle,
} from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import {
  CreditCard,
  Minus,
  Plug2,
  PlusIcon,
  ShoppingCart,
  ShoppingCartIcon,
  Trash,
  Trash2,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";

const Orders = () => {
  const order = true;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart />
          <article className="text-sm flex items-center gap-2">
            Current Orders{" "}
            <span className="shadow-md rounded-full w-max h-6 px-1 border text-center ">
              10
            </span>
          </article>
        </div>

        <div className="flex items-center gap-4">
          <Trash2 size={20} className="text-red-500 cursor-pointer" />
          <span className="text-yellow-500 cursor-pointer">Clear All</span>
        </div>
      </div>

      {/* orders */}
      <div className="flex flex-col gap-4 ">
        {order ? (
          <div className="h-72 overflow-y-auto">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="flex w-full h-20 items-start mt-8 shadow-md  rounded-lg border p-2 overflow-hidden ">
                <div className="w-full flex items-start gap-2">
                  <Image
                    src="/61Yx5-N155L._SX3000_.jpg"
                    alt="product"
                    width={1000}
                    height={1000}
                    className="w-12 h-12 object-cover"
                  />
                  <div className="w-full flex flex-col gap-1">
                    <h2 className="line-clamp-1 ">Laptop</h2>
                    <div className="flex items-center justify-between">
                      <span>$100.00</span>
                      <div className="flex gap-2 items-center">
                        <Button
                          variant={"outline"}
                          size="icon"
                          className={"cursor-pointer"}
                        >
                          <Minus />
                        </Button>
                        <span>2</span>
                        <Button
                          variant={"outline"}
                          size="icon"
                          className={"cursor-pointer"}
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 h-60 justify-center items-center">
            <ShoppingCartIcon size={60} className="text-gray-500" />
            <span className="text-2xl font font-bold text-gray-600">
              Your cart is empty
            </span>
          </div>
        )}
      </div>

      {/* order description */}
      <div className="w-full mt-8 flex flex-col gap-4 ">
        <div>
          <Label
            htmlFor="discount"
            className={"text-gray-600 dark:text-gray-100"}
          >
            Discount
          </Label>
          <Input
            className={"w-44 mt-4  text-gray-600 dark:text-gray-50"}
            value={"10"}
            placeholder="% 0.00"
          />
        </div>
        <div className=" w-full flex items-center justify-between border p-1.5 rounded-lg my-4 ">
          <span className="text-gray-600 dark:text-gray-50 font-semibold">
            Subtotal :
          </span>
          <span className={""}>$100.00</span>
        </div>
        <div className=" w-full flex items-center justify-between border p-1.5 rounded-lg my-4 ">
          <span className="text-gray-900 dark:text-gray-50 font-semibold">
            Total :
          </span>
          <span className={""}>$120.00</span>
        </div>
        {/* <div>
          <Label htmlFor="discount">Discount</Label>
          <Input className={"w-44"} />
        </div> */}
      </div>

      {/* Payment */}
      <div>
        <Card>
          <CardContent>
            {" "}
            <CardTitle>Payment Details</CardTitle>
            {/* amount */}
            <div className=" w-full flex flex-col my-4 ">
              <span className="text-gray-700 dark:text-gray-50 font-semibold">
                Amount
              </span>

              <span className={"my-2 border p-1.5 rounded-lg "}>$100.00</span>
            </div>
            {/* Method */}
            <div className=" w-full flex flex-col my-4 ">
              <span className="text-gray-700 dark:text-gray-50 font-semibold">
                Cash
              </span>
              <div className="flex items-center gap-1">
                <Input
                  className={"w-full mt-4  text-gray-600 dark:text-gray-50"}
                  value={"10"}
                  type={"number"}
                  placeholder="% 0.00"
                />

                <Select>
                  <SelectTrigger className="w-[30px]">
                    {/* <SelectValue placeholder="cash" /> */}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>method</SelectLabel>
                      <SelectItem value={"cash"}>Cash</SelectItem>
                      <SelectItem value={"card"}>Card</SelectItem>
                      <SelectItem value={"bank"}>Bank</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button variant={"primary"} className={"w-full mt-4"}>
                <CreditCard /> Pay $120.00
              </Button>

              {/* <span className={"my-2 border p-1.5 rounded-lg "}>$100.00</span> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
