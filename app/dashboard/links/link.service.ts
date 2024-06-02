import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@components/ui/use-toast";
import axiosClient from "config/_axios-client";
import { LinkEntity, LinkType } from "@api/link/link.schema";
import { errorTypes } from "@api/_config/constants";

const createLink = async (data: LinkType) => {
  await axiosClient.post("/api/link", {
    ...data,
  });
};

const getLinks = async () => {
  const res = await axiosClient.get("/api/link");
  return res.data?.data;
};

export const useGetLinks = () => {
  const { data, error, isLoading, isSuccess,  } = useQuery<LinkEntity[], Error>({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  return { data, error, isLoading, isSuccess,  };
};

export const useCreateLink = () => {
  const { toast } = useToast();

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: createLink,
    onSuccess(data, variables, context) {
      toast({
        title: "Link created sucessfully",
        variant: "successive",
      });
    },
    onError(error: any, variables, context) {
      const message = error?.response?.data?.error?.message;
      const errors = error?.response?.data?.error?.errors as string[];

      if (message === errorTypes.validation) {
        toast({
          title: `Validation Error`,
          description: `${errors?.join("\n")}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: `There's some issue while creating new link. Please try again later.`,
          variant: "destructive",
        });
      }
    },
  });

  return { mutate, data, error, isPending, isSuccess };
};
