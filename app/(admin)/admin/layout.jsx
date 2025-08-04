import {
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import React from "react";
import SideBar from "./components/SideBar/SideBar";

const layout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="w-full flex min-h-screen">
        <SideBar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;
