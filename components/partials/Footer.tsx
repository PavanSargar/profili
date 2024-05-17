"use cilent";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className=" my-12 mx-20 p-4 px-6 bg-muted rounded-lg shadow-md flex items-center justify-center">
      © {new Date().getFullYear()} Google
    </footer>
  );
};

export default Footer;
