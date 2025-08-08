"use client";
import Logo from "../../../../../components/header/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  useSidebar,
} from "../../../../../components/ui/sidebar";
import {
  BadgeDollarSign,
  ChartColumn,
  ChartLine,
  Group,
  GroupIcon,
  HandCoins,
  LayoutDashboardIcon,
  NotebookPen,
  Package,
  ShoppingBag,
  UsersRound,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../../components/ui/tooltip";
import { cn } from "../../../../../lib/utils";
const Links = [
  {
    main: {
      path: "Main",
      Urls: [
        {
          title: "dashboard",
          url: "/admin",
          icon: <LayoutDashboardIcon size={20} />,
        },
        {
          title: "Point of Sale",
          url: "/admin/point-of-sale",
          icon: <ShoppingBag size={20} />,
        },
      ],
    },
  },
  {
    inventory: {
      path: "Inventory Management",
      Urls: [
        {
          title: "Inventory",
          url: "/admin/inventory",
          icon: <Warehouse size={20} />,
        },
        {
          title: "Item Groups",
          url: "/admin/item-groups",
          icon: <GroupIcon size={20} />,
        },
        {
          title: "Products",
          url: "/admin/products",
          icon: <Package size={20} />,
        },
        {
          title: "Categories",
          url: "/admin/categories",
          icon: <Group size={20} />,
        },
      ],
    },
  },
  {
    salesAndCustomers: {
      path: "Sales and Customers",
      Urls: [
        {
          title: "Sales",
          url: "/admin/sales",
          icon: <BadgeDollarSign size={20} />,
        },
        {
          title: "Customers",
          url: "/admin/customers",
          icon: <UsersRound size={20} />,
        },
        // {
        //   title: "Invoices",
        //   url: "/admin/invoices",
        //   icon: <NotebookPen size={20} />,
        // },
      ],
    },
  },
  {
    analyticTools: {
      path: "Analytic Tools",
      Urls: [
        {
          title: "Reports",
          url: "/admin/reports",
          icon: <ChartColumn size={20} />,
        },
        // {
        //   title: "Analytics",
        //   url: "/admin/analytics",
        //   icon: <ChartLine size={20} />,
        // },
        {
          title: "Profit",
          url: "/admin/profit",
          icon: <HandCoins size={20} />,
        },
      ],
    },
  },
];

const SideBar = () => {
  const { open } = useSidebar();
  console.log(open);
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className={cn("flex flex-col  p-4", !open && "mt-10")}>
          <div
            className={cn(
              "mb-8 flex items-center justify-center gap-4",
              !open && "hidden"
            )}
          >
            <Logo />
          </div>
          {Links.map((item, index) => (
            <div key={index} className="flex flex-col border-b-2">
              {/* main */}
              <div className="flex flex-col mb-2">
                <h2 className={cn("text-lg font-semibold ", !open && "hidden")}>
                  {item?.main?.path}
                </h2>
                {item?.main?.Urls?.map((link, index) => (
                  <Link
                    href={link?.url}
                    className={cn(
                      "flex items-center gap-2 rounded-md py-2 text-sm hover:bg-gray-200 transition-all duration-300 ease-in-out px-4 dark:hover:text-gray-600",
                      !open && "px-0 hover:bg-transparent"
                    )}
                    key={index}
                  >
                    {open ? (
                      <div className="flex gap-4 items-center">
                        {link.icon} {link.title}
                      </div>
                    ) : (
                      <div>
                        <Tooltip>
                          <TooltipTrigger> {link.icon}</TooltipTrigger>
                          <TooltipContent side="right">
                            {link.title}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
              {/* inventory */}
              <div className="flex flex-col mb-2">
                <h2 className={cn("text-lg font-semibold ", !open && "hidden")}>
                  {item?.inventory?.path}
                </h2>
                {item?.inventory?.Urls?.map((link, index) => (
                  <Link
                    href={link?.url}
                    className={cn(
                      "flex items-center gap-2 rounded-md py-2 text-sm hover:bg-gray-200 transition-all duration-300 ease-in-out px-4 dark:hover:text-gray-600",
                      !open && "px-0 hover:bg-transparent"
                    )}
                    key={index}
                  >
                    {open ? (
                      <div className="flex gap-4 items-center">
                        {link.icon} {link.title}
                      </div>
                    ) : (
                      <div>
                        <Tooltip>
                          <TooltipTrigger> {link.icon}</TooltipTrigger>
                          <TooltipContent side="right">
                            {link.title}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
              {/* sales and customers */}
              <div className="flex flex-col mb-2">
                <h2 className={cn("text-lg font-semibold ", !open && "hidden")}>
                  {item?.salesAndCustomers?.path}
                </h2>
                {item?.salesAndCustomers?.Urls?.map((link, index) => (
                  <Link
                    href={link?.url}
                    className={cn(
                      "flex items-center gap-2 rounded-md py-2 text-sm hover:bg-gray-200 transition-all duration-300 ease-in-out px-4 dark:hover:text-gray-600",
                      !open && "px-0 hover:bg-transparent"
                    )}
                    key={index}
                  >
                    {open ? (
                      <div className="flex gap-4 items-center">
                        {link.icon} {link.title}
                      </div>
                    ) : (
                      <div>
                        <Tooltip>
                          <TooltipTrigger> {link.icon}</TooltipTrigger>
                          <TooltipContent side="right">
                            {link.title}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
              {/* analytic tools */}
              <div className="flex flex-col mb-2">
                <h2 className={cn("text-lg font-semibold ", !open && "hidden")}>
                  {item?.analyticTools?.path}
                </h2>
                {item?.analyticTools?.Urls?.map((link, index) => (
                  <Link
                    href={link?.url}
                    className={cn(
                      "flex items-center gap-2 rounded-md py-2 text-sm hover:bg-gray-200 transition-all duration-300 ease-in-out px-4 dark:hover:text-gray-600",
                      !open && "px-0 hover:bg-transparent"
                    )}
                    key={index}
                  >
                    {open ? (
                      <div className="flex gap-4 items-center">
                        {link.icon} {link.title}
                      </div>
                    ) : (
                      <div>
                        <Tooltip>
                          <TooltipTrigger> {link.icon}</TooltipTrigger>
                          <TooltipContent side="right">
                            {link.title}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
