"use client";
import React, { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ThemeProvider } from "@components/theme-provider";
import { Toaster } from "@components/ui/toaster";

interface ProviderProps extends PropsWithChildren {
  session: Session;
}

const Provider = ({ children, session }: ProviderProps) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
