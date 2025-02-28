import Header from "@/components/Header";
import React, { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className='grid justify-items-center p-8 pb-20 gap-16 sm:p-20'>
        {children}
      </div>
    </>
  );
}
