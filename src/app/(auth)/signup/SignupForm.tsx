"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import registerUser, { RegisterUserRequest } from "@/core/api/registerUser";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form/FormInput";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

export default function SignupForm() {
  const router = useRouter();
  const resolver = yupResolver(schema);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const signUp = useMutation({
    mutationFn: (data: RegisterUserRequest) => registerUser(data),
    onSuccess: () => {
      router.replace("/");
      toast("User created successfully!");
    },
    onError: (err: any) => {
      console.log(err);
      toast(err.Message);
    },
  });

  const onSubmit = (data: RegisterUserRequest) => {
    signUp.mutate(data);
  };

  return (
    <form method='POST' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-3xl font-semibold text-slate-700'>Sign up</h1>
      <div className='space-y-4 mt-5'>
        <FormInput
          control={control}
          errors={errors}
          type='text'
          name='email'
          placeholder='Email'
          className='placeholder:text-gray-400 w-full inline-block bg-slate-300'
        />
        <FormInput
          control={control}
          errors={errors}
          type='password'
          name='password'
          placeholder='Password'
          className='placeholder:text-gray-400 w-full inline-block bg-slate-300'
        />
        <Button
          type='submit'
          className='w-full bg-slate-500 hover:bg-slate-700 text-slate-200 mt-2'>
          Sign Up
        </Button>
      </div>
    </form>
  );
}
