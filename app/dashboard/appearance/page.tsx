"use client";
import React from "react";
import { useGetAppearance } from "./appearance.service";

type Props = {};

const Appearance = (props: Props) => {
  const { data, isLoading, error } = useGetAppearance();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while getting appearance</div>;
  }
  return <div>{JSON.stringify(data)}</div>;
};

export default Appearance;
