import type { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import Providers from "providers";
import RTKClientProvider from "providers/rtk-client-provider";
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
          <Providers session={session}>{children}</Providers>
        </body>
      </html>
    </RTKClientProvider>
  );
}
