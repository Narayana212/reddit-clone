import Link from "next/link";
import { FC } from "react";
import { Button, buttonVariants } from "./ui/button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./user-account-nav";
import SearchBar from "./search-bar";

interface NavbarProps {}

const Navbar= async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed top-0 inset-x-0 h-fit  bg-zinc-100 border-b border-zinc-300 z-[10] py-3 ">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2 ">
        <Link href="/">
          <p className="text-zinc-700 text-lg font-medium">Reddit</p>
        </Link>
        <SearchBar/>

        {session ? (
          <UserAccountNav user={session.user}/>
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
