"use client";
import Header from "@/components/Header";
import getMovieById from "@/core/api/getMovieById";
import getMovieVideo from "@/core/api/getMovieVideo";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineBackward,
  AiOutlineForward,
} from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import parse from "html-react-parser";

export default function Watch({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const router = useRouter();
  const [isNavVisible, setIsNavVisible] = useState(true);
  let hideNavTimeout: NodeJS.Timeout;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = () => {
    setIsNavVisible(true);
    clearTimeout(hideNavTimeout);

    hideNavTimeout = setTimeout(() => {
      setIsNavVisible(false);
    }, 2500);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const { movieId } = use(params);

  const { data, isLoading } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieVideo(movieId),
  });

  if (!data && !isLoading) {
    return (
      <>
        <Header />
        <div className="w-full flex justify-center font-medium text-2xl mt-10">
          Movie not found
        </div>
      </>
    );
  }

  // const handleBackward = () => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime -= 5; // Go back 5 seconds
  //   }
  // };

  // const handleForward = () => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime += 5; // Go forward 5 seconds
  //   }
  // };

  return !isLoading ? (
    <div className="h-screen w-screen bg-black">
      <nav
        className={`fixed w-full p-4 z-10 flex items-center gap-8 bg-black/70 transition-opacity duration-300 ${
          isNavVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <AiOutlineArrowLeft
          size={40}
          className="text-white hover:cursor-pointer"
          onClick={() => router.push("/")}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {data?.title}
        </p>
      </nav>
      <div className="h-full w-full flex items-center justify-center">
        {parse(data?.videoUrl || "")}
      </div>
    </div>
  ) : (
    <div className="flex justify-center">
      <FaSpinner />
    </div>
  );
}
