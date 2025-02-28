import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className='mt-24 rounded bg-slate-200 py-10 px-6 md:max-w-sm md:px-14 shadow-md'>
      <LoginForm />
      <div className='text-sm flex justify-center text-slate-700 mt-2 gap-1'>
        <span>Don't have an account?</span>
        <Link href='/signup' className='hover:underline'>
          Sign up now!
        </Link>
      </div>
    </div>
  );
}
