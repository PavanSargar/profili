import { notFound } from "next/navigation";
interface PublicProfileProps {
  params: {
    username: string;
  };
}

const PublicProfile = async ({ params }: PublicProfileProps) => {
  const prom = await Promise.resolve(false);

  //if the user's not found
  if (!prom) {
    notFound();
  }

  return <div>{params.username}</div>;
};

export default PublicProfile;
