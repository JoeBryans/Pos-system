"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Image from "next/image";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function Combobox({ products, value, setValue }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          // className="w-[200px] justify-between"
          className=" w-full justify-between"
        >
          {value
            ? products.find((product) => product.id === value)?.name
            : "Select Product..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-md w-full">
        <Command>
          <CommandInput
            placeholder="Search Product..."
            className="w-full h-9"
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    // const selectedProduct = products.find(
                    //   (product) =>
                    //     product.name.toLowerCase() ===
                    //     currentValue.toLowerCase()
                    // );
                    // if (selectedProduct) {
                    //   setValue(selectedProduct.id);
                    //   setOpen(false);
                    //   // Here you can add logic to handle the selected product.
                    //   // e.g., call a function to add the product to a cart.
                    //   console.log(
                    //     "Selected product ID:",
                    //     selectedProduct.value
                    //   );
                    // }
                  }}
                >
                  <div className={"flex items-center gap-2 mb-4"}>
                    <Image
                      src={product.images?.url[0]}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="rounded-md w-18 h-14 "
                    />
                    {product.name}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === product.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
