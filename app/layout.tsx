import type { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import RTKClientProvider from "config/rtk-client-provider";
import Provider from "./provider";
import { fonts } from "./fonts";
import { cn } from "@utils/classname";
import "./globals.css";

export const metadata: Metadata = {
  title: "Profili",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession()) as Session;
  return (
    <RTKClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fonts.poppins.variable
          )}
        >
          <Provider session={session}>{children}</Provider>
        </body>
      </html>
    </RTKClientProvider>
  );
}
