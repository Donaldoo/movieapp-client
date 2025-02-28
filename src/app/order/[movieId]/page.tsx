"use client";

import { Button } from "@/components/ui/button";
import getURL from "@/components/utils/urlUtils";
import getMovieById from "@/core/api/getMovieById";
import postPurchase, { OrderRequest } from "@/core/api/postPurchase";
import { OrderStatus, PokPaymentData } from "@/core/OrderHelperEnum";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use } from "react";
import pokWhiteSvg from "@/../public/pokWhite.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";

export default function Buy({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  let confirmationUrl = "";
  const { movieId } = use(params);
  const router = useRouter();

  const pokRedirectUrl = getURL(`/watch/${movieId}`);
  const pokFailRedirectUrl = getURL("/");

  const saveOrder = useMutation({
    mutationFn: (data: OrderRequest) => postPurchase(data),
    onSuccess: (response) => {
      confirmationUrl = response.pokOrderUrl;
      router.push(confirmationUrl);
    },
  });

  const onPokClick = async () => {
    saveOrder.mutate({
      status: OrderStatus.Pending,
      productId: movieId,
      redirectUrl: (await pokRedirectUrl).toString(),
      failRedirectUrl: (await pokFailRedirectUrl).toString(),
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId),
    enabled: !!movieId,
  });

  return isLoading ? (
    <FaSpinner />
  ) : (
    <div className='grid justify-items-center p-8 pb-20 gap-16 sm:p-20'>
      <div className='flex bg-white px-3 py-5 shadow-sm w-2/3 justify-center rounded-xl border gap-2'>
        <img src={data?.thumbnailUrl} className='w-60 h-60 object-cover' />
        <div className='flex flex-col'>
          <div className='w-full px-2'>
            <h1 className='py-4 text-2xl font-semibold text-gray-900 flex justify-between'>
              {data?.title}
              <p className='font-normal'>{data?.price}EUR</p>
            </h1>
          </div>
          <div className='w-full border border-gray-100 px-2 py-2.5'>
            <p className='text-sm font-medium text-gray-600'>
              {data?.description}
            </p>
          </div>
        </div>
      </div>
      <Button
        className='sm:gap-2 w-2/6 flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 py-6 font-bold text-white'
        onClick={onPokClick}>
        Pay with <Image src={pokWhiteSvg as StaticImport} alt='POK' />{" "}
      </Button>
    </div>
  );
}
