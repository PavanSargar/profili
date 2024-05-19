import React, { PropsWithChildren } from "react";
import DashboardNavbar from "@components/partials/dashboard-navbar";

interface LayoutProps extends PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardNavbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
