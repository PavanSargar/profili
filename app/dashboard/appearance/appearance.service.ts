import { AppearanceEntity } from "@api/appearance/appearance.schema";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "config/_axios-client";

const getAppearance = async () => {
  const res = await axiosClient.get("/api/appearance");
  return res.data?.data;
};

const useGetAppearance = () => {
  const { data, error, isLoading, isSuccess } = useQuery<
    AppearanceEntity[],
    Error
  >({
    queryKey: ["appearance"],
    queryFn: getAppearance,
  });

  return { data, error, isLoading, isSuccess };
};

export { getAppearance, useGetAppearance };
