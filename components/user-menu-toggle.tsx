"use client";
import * as React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserMenuToggleProps {
  image?: string;
  name?: string | null;
}
export function UserMenuToggle({ image, name }: UserMenuToggleProps) {
  const router = useRouter();

  const avatarFallback = (
    name ? name.split("")[0][0] + name.split("")[1][0] : "A"
  ).toUpperCase();

  const handleLogout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={image} />
          {!Boolean(image) && (
            <AvatarFallback className="bg-slate-300 text-black">
              {avatarFallback}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
