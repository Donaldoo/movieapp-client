"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavLinks() {
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Only runs on the client side
    const auth = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("authToken="));
    setIsAuthenticated(auth);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  return (
    <ul className='flex gap-4'>
      <Link href='about'>
        <li className='hidden sm:inline text-slate-700 hover:underline'>
          About
        </li>
      </Link>
      {isAuthenticated ? (
        <Link href='login' onClick={handleLogout}>
          <li className='hidden sm:inline text-slate-700 hover:underline'>
            Log out
          </li>
        </Link>
      ) : (
        <Link href={pathname === "/login" ? "signup" : "login"}>
          <li className='hidden sm:inline text-slate-700 hover:underline'>
            {pathname === "/login" ? "Sign up" : "Sign in"}
          </li>
        </Link>
      )}
    </ul>
  );
}
