"use client";
import React, { useEffect } from "react";
import axiosClient from "config/_axios-client";

type Props = {};

const LinkLIst = (props: Props) => {
  const fetchLinks = async () => {
    const links = await axiosClient.get("/api/link");
    console.log("links repsonse:::", links.data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return <div>LinkLIst</div>;
};

export default LinkLIst;
