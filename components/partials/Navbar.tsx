"use client";
import React from "react";
import Link from "next/link";
import { Session } from "next-auth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@components/ui/navigation-menu";
import { Button } from "@components/ui/button";
import { ThemeModeToggle } from "@components/theme-toggle";
import { UserMenuToggle } from "@components/user-menu-toggle";

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const isSession = !!session?.user?.email;

  return (
    <NavigationMenu className="my-12 mx-20 p-4 px-6 border-white bg-muted rounded-lg shadow-md">
      <div className="flex items-center justify-between w-screen">
        <div className="flex items-center gap-8">
          <Link href="/">
            <h1 className="font-bold text-3xl">Google</h1>
          </Link>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <Link className="text-md" href="/features">
                Features
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link className="text-md" href="/Pricing">
                Pricing
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link className="text-md" href="/about">
                About
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>

        <div className="flex items-center justify-end gap-2">
          <ThemeModeToggle />
          {!isSession ? (
            <>
              <Link href="/login">
                <Button variant="outline" className="bg-transparent text-lg">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-lg">Register</Button>
              </Link>
            </>
          ) : (
            <UserMenuToggle
              name={session?.user?.name}
              image={session?.user?.image || ""}
            />
          )}
        </div>
      </div>
    </NavigationMenu>
  );
};

export default Navbar;
