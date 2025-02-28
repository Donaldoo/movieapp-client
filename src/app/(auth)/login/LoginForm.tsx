"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authenticateUser from "@/core/api/authenticateUser";
import { RegisterUserRequest } from "@/core/api/registerUser";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form/FormInput";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

export default function LoginForm() {
  const router = useRouter();
  const resolver = yupResolver(schema);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const logIn = useMutation({
    mutationFn: (data: RegisterUserRequest) => authenticateUser(data),
    onSuccess: (response) => {
      document.cookie = `authToken=${response.token}; path=/;`;
      localStorage.setItem("token", response?.token);
      router.replace("/");
    },
    onError: (error: any) => toast(error.Message),
  });

  const onSubmit = (data: RegisterUserRequest) => {
    logIn.mutate(data);
  };

  return (
    <form method='POST' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-3xl font-semibold text-slate-700'>Log in</h1>
      <div className='space-y-4 mt-5'>
        <FormInput
          control={control}
          errors={errors}
          type='email'
          name='email'
          placeholder='Email'
          className='placeholder:text-gray-400 w-full inline-block bg-slate-300'
        />
        <FormInput
          type='password'
          name='password'
          placeholder='Password'
          className='placeholder:text-gray-400 w-full inline-block bg-slate-300'
          control={control}
          errors={errors}
        />
        <Button
          type='submit'
          className='w-full bg-slate-500 hover:bg-slate-700 text-slate-200 mt-2'>
          Log In
        </Button>
      </div>
    </form>
  );
}
