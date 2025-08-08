"use client";

import * as React from "react";
import Link from "next/link";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  Search,
  UserRound,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Logo from "./Logo";
import CartBadge from "./Cart/Badge";
import { Cartegories } from "./Category/cartegories";
import Searchs from "./Search";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../mode";
import { LoggedInUser } from "../../lib/LoggedUser";
import Image from "next/image";

export default function NavBar() {
  const path = usePathname();
  const [user, setUser] = React.useState(null);
  // console.log("user", user);

React.useEffect( () => {
    const GetUser=async()=>{ 
      const user = await LoggedInUser();
      setUser(user);
    }
    GetUser();
  }, []);
  console.log(path);
  const isAdminPage = path.startsWith("/admin");
  return (
    <div className="flex flex-col items-center justify-center w-full py-2 shadow-md dark:shadow-md border-b-2 bg-white dark:bg-gray-900">
      {!isAdminPage ? (
        <div className="flex flex-col items-center justify-center w-full py-2 shadow-md dark:shadow-gray-500/50 bg-white dark:bg-gray-900">
          <div className="flex justify-between items-center  px-5 gap-10 max-w-7xl w-full ">
            <Logo />
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <Searchs className="hidden md:flex" />

                <NavigationMenuItem className="ml-4 relative  ">
                  <NavigationMenuTrigger className="py-2">
                    <div className="flex flex-col  items-center">
                      <span>Hello, sign in</span>
                      <h2>Acount & List</h2>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-50 absolute z-50  bg-white rounded-md shadow-md">
                    <div className="w-full  flex flex-col md:flex-row gap-5 px-3 items-center">
                      <Link
                        href="/sign-in"
                        className="w-full md:w-max flex justify-center items-center p-1.5  text-sm bg-blue-600  hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md"
                      >
                        <UserRound
                          size={30}
                          className="h-6 w-6"
                          color="white"
                        />
                        <span className="text-white hover:text-gray-100 font-bold">
                          Sign in
                        </span>
                      </Link>
                      <Link
                        href="/sign-up"
                        className="w-full md:w-max flex justify-center items-center p-1.5  text-sm bg-gray-600  hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
                      >
                        <UserRound className="h-6 w-6" color="white" />
                        <span className="text-white hover:text-gray-100 font-bold">
                          Sign up
                        </span>
                      </Link>
                    </div>

                    <ul className="grid w-[200px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="#"
                            className="flex-row items-center gap-2"
                          >
                            <CircleHelpIcon />
                            Backlog
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="#"
                            className="flex-row items-center gap-2"
                          >
                            <CircleIcon />
                            To Do
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="#"
                            className="flex-row items-center gap-2"
                          >
                            <CircleCheckIcon />
                            Done
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <CartBadge />
              </NavigationMenuList>
            </NavigationMenu>
            {/* <ModeToggle /> */}
          </div>
          <Searchs className="w-[95%] mt-6 md:hidden" />
        </div>
      ) : (
        <div className="flex justify-between items-center  px-5 gap-10 max-w-7xl w-full ">
          <div className="-ml-5 flex items-center gap-8">
            <Logo />
            {/* <div className="w-max flex items-center  text-sm cursor-pointer mx-4 overflow-hidden rounded-r-2xl bg-gray-100 dark:bg-gray-700 ">
              <Input
                placeholder="Search..."
                className="w-44  rounded-none border-0 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none dark:text-white focus:ring-0 "
              />
              <Button variant={"primary"} size={"icon"}>
                <Search className="h-4 w-4" color="white" />
              </Button>
            </div> */}
          </div>

          <NavigationMenu viewport={false}>
            <NavigationMenuList className={"flex gap-8 items-center"}>
              {/* <NavigationMenuItem className="ml-4 relative  ">
                <NavigationMenuTrigger className="py-2">
                  <div className="flex flex-col  items-center">
                    <span>Hello, sign in</span>
                    <h2>Acount & List</h2>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-50 absolute z-50  bg-white rounded-md shadow-md">
                  <div className="w-full  flex flex-col md:flex-row gap-5 px-3 items-center">
                    <Link
                      href="/sign-in"
                      className="w-full md:w-max flex justify-center items-center p-1.5  text-sm bg-blue-600  hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md"
                    >
                      <User2 className="h-6 w-6" color="white" />
                      <span className="text-white hover:text-gray-100 font-bold">
                        Sign in
                      </span>
                    </Link>
                    <Link
                      href="/sign-up"
                      className="w-full md:w-max flex justify-center items-center p-1.5  text-sm bg-gray-600  hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
                    >
                      <User2 className="h-6 w-6" color="white" />
                      <span className="text-white hover:text-gray-100 font-bold">
                        Sign up
                      </span>
                    </Link>
                  </div>

                
                </NavigationMenuContent>
              </NavigationMenuItem> */}
              <div className="flex items-center gap-2 text-sm cursor-pointer px-4 ">
                {user ? (
                  <div className="flex items-center gap-2 text-sm cursor-pointer px-4 ">
                    <Image
                      src={user?.image}
                      alt="user"
                      width={300}
                      height={300}
                      className="w-8 h-8 rounded-full shadow-md border-2 cursor-pointer"
                    />
                    <span>{user?.companyName}</span>
                  </div>
                ) : (
                  // <UserRound
                  //   size={30}
                  //   className="w-8 h-8 rounded-full shadow-md border-2 cursor-pointer"
                  //     />
                  <Link
                    href="/sign-in"
                    className="w-8 h-8 rounded-full shadow-md border-2 cursor-pointer"
                  >
                    <UserRound
                      size={30}
                      className="w-8 h-8 rounded-full shadow-md border-2 cursor-pointer"
                    />
                  </Link>
                )}
              </div>
              <ModeToggle />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </div>
  );
}
