import { getServerSession } from "next-auth";
import Hero from "./_components/hero";
import Navbar from "@components/partials/Navbar";
import Footer from "@components/partials/Footer";

export default async function Home() {
  const session = await getServerSession();
  return (
    <>
      <Navbar session={session} />
      <main className="flex justify-center items-center flex-col w-full p-3 h-[60svh]">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
