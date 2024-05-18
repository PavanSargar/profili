import React, { PropsWithChildren } from "react";
import DashboardNavbar from "@components/partials/dashboard-navbar";

interface LayoutProps extends PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardNavbar />
      {children}
    </div>
  );
};

export default Layout;
