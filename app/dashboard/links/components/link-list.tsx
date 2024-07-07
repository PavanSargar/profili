"use client";
import React from "react";
import { useGetLinks } from "../link.service";

type Props = {};

const LinkLIst = (props: Props) => {
  const { data, error, isLoading, isSuccess } = useGetLinks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching links</div>;
  }

  return (
    <div>
      {data?.length ? (
        data?.map((item) => <li key={item?._id}>{item?.title}</li>)
      ) : (
        <>No links added yet</>
      )}
    </div>
  );
};

export default LinkLIst;
