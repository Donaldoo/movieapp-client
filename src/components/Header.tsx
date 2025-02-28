import Link from "next/link";
import React from "react";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center mx-auto py-5 px-28'>
        <Link href='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Movie</span>
            <span className='text-slate-700'>App</span>
          </h1>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
