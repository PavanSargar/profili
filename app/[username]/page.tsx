interface PublicProfileProps {
  params: {
    username: string;
  };
}

const PublicProfile = ({ params }: PublicProfileProps) => {
  return <div>{params.username}</div>;
};

export default PublicProfile;
