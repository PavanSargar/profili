"use client";
import React, { PropsWithChildren } from "react";
import Footer from "@components/partials/footer";
import Navbar from "@components/partials/navbar";

interface WrapperProps extends PropsWithChildren {}

//* use this component if you want to change navbar based on routes
const Wrapper = ({ children }: WrapperProps) => {
  const partialRoutes = ["/login", "/register", "/profile"];
  const currrentPath = window.location.pathname;

  return (
    <>
      {/* {!partialRoutes.includes(currrentPath) && <Navbar />} */}
      {children}
      {/* {!partialRoutes.includes(currrentPath) && <Footer />} */}
    </>
  );
};

export default Wrapper;
