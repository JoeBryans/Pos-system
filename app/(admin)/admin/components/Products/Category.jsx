"use client";

import * as React from "react";

import { Button } from "../../../../../components/ui/button";
import {

} from "../../../../../components/ui/dropdown-menu";

export function Cartegories() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary" className="rounded-none cursor-pointer ">
          All
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Product Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Fashion</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">
            Phone and Tablet
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">
            Laptop and Accessories
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">
            Electronics
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">
            Home and Office
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
