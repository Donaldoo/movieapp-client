import Link from "next/link";
import SignupForm from "./SignupForm";

export default function Signup() {
  return (
    <div className='mt-24 rounded bg-slate-200 py-10 px-6 md:max-w-sm md:px-14 shadow-md'>
      <SignupForm />
      <div className='text-sm flex justify-center text-slate-700 mt-2 gap-2'>
        <span>Already have an account?</span>
        <Link href='/login' className='hover:underline'>
          Log in now!
        </Link>
      </div>
    </div>
  );
}
