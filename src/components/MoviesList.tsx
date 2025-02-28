"use client";
import React from "react";
import Image from "next/image";
import MovieCard from "./MovieCard";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import getMovies from "@/core/api/getMovies";
import { FaSpinner } from "react-icons/fa";

export default function MoviesList() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies(),
  });

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <FaSpinner />
      </div>
    );

  const isAuthenticated = document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith("authToken="));

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6'>
      {data?.map((movie) => (
        <div
          key={movie.id}
          className='relative h-60 hover:cursor-pointer'
          onClick={() =>
            movie.isPurchased && isAuthenticated
              ? router.push(`/watch/${movie.id}`)
              : router.push(`/order/${movie.id}`)
          }>
          <Image
            src={movie.thumbnailUrl}
            alt='movie'
            width={500}
            height={400}
            className='rounded-md absolute w-full h-full object-cover'
          />
          <div className='h-64 relative z-10 w-full transform transition duration-400 hover:scale-110 opacity-0 hover:opacity-100'>
            <div className='bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border'>
              <Image
                src={movie.thumbnailUrl}
                alt='Movie'
                width={800}
                height={800}
                className='absolute w-full h-full -z-10 rounded-lg object-cover'
              />
              <MovieCard
                title={movie.title}
                id={movie.id}
                overview={movie.description}
                price={movie.price}
                videoUrl={movie.videoUrl}
                isPurchased={movie.isPurchased}
                isAuth={isAuthenticated}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
