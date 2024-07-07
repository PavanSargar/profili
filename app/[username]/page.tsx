import { notFound } from "next/navigation";
interface PublicProfileProps {
  params: {
    username: string;
  };
}

const PublicProfile = async ({ params }: PublicProfileProps) => {
  const userLinks = await fetch(
    `http://localhost:3000/api/public-profile/${params.username}`,
    {
      method: "get",
    }
  );
  const links = await userLinks.json();

  //if the user's not found
  if (links?.status !== "success") {
    notFound();
  }

  return (
    <div>
      {links?.data?.map((item: any) => (
        <li key={item?._id}>{item?.title}</li>
      ))}
    </div>
  );
};

export default PublicProfile;
