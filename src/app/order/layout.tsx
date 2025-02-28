import Header from "@/components/Header";
import React from "react";

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className='p-5 md:p-7 lg:px-28'>{children}</div>
    </>
  );
}
