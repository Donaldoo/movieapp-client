"use client";

import getMovieById from "@/core/api/getMovieById";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import pokWhiteSvg from "@/../public/pokWhite.svg";
import Image from "next/image";
import postPurchase from "@/core/api/postPurchase";
import getURL from "@/components/utils/urlUtils";
import { OrderRequest } from "@/core/api/postPurchase";
import { OrderStatus, PurchaseType } from "@/core/OrderHelperEnum";
import { useState } from "react";

export default function OrderPage() {
  const params = useParams();
  let confirmationUrl = "";
  const movieId = params.movieId as string;
  const router = useRouter();
  const [selectedPurchaseType, setSelectedPurchaseType] =
    useState<PurchaseType>(PurchaseType.Price);

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
      purchaseType: selectedPurchaseType,
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid justify-items-center p-4 sm:p-8 md:p-12 lg:p-20 gap-8 sm:gap-16 w-full max-w-7xl">
        <div className="flex flex-col sm:flex-row bg-white px-3 py-5 shadow-sm w-full sm:w-[90%] md:w-[80%] justify-center rounded-xl border gap-4 sm:gap-6">
          <img
            src={data?.thumbnailUrl}
            className="w-full sm:w-60 h-48 sm:h-60 object-cover rounded-lg"
          />
          <div className="flex flex-col flex-1">
            <div className="w-full px-2">
              <h1 className="py-2 sm:py-4 text-xl sm:text-2xl font-semibold text-gray-900 text-center">
                {data?.title}
                {/* <p className='font-normal'>{data?.price}EUR</p>ß */}
              </h1>
            </div>
            <div className="w-full border border-gray-100 px-2 py-2.5">
              <p className="text-sm font-medium text-gray-600">
                {data?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full sm:w-[90%] md:w-[80%] justify-end">
          <Button
            className="w-32 sm:w-40"
            onClick={() => {
              setSelectedPurchaseType(PurchaseType.Price);
              const modal = document.getElementById("paymentModal");
              const content = document.getElementById("modalContent");
              modal?.classList.remove("hidden");
              modal?.classList.add("flex");
              setTimeout(() => {
                content?.classList.remove("-translate-y-full");
                content?.classList.add("translate-y-0");
              }, 10);
            }}
          >
            Buy {data?.price} EUR
          </Button>
          <Button
            className="w-32 sm:w-40"
            onClick={() => {
              setSelectedPurchaseType(PurchaseType.RentPrice);
              const modal = document.getElementById("paymentModal");
              const content = document.getElementById("modalContent");
              modal?.classList.remove("hidden");
              modal?.classList.add("flex");
              setTimeout(() => {
                content?.classList.remove("-translate-y-full");
                content?.classList.add("translate-y-0");
              }, 10);
            }}
          >
            Rent {data?.rentPrice} EUR
          </Button>
        </div>
      </div>

   
      <div
        id="paymentModal"
        className="hidden fixed inset-0 bg-black/20 transition-all duration-300 ease-in-out z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const modal = document.getElementById("paymentModal");
            const content = document.getElementById("modalContent");
            content?.classList.remove("translate-y-0");
            content?.classList.add("-translate-y-full");
            setTimeout(() => {
              modal?.classList.add("hidden");
              modal?.classList.remove("flex");
            }, 300);
          }
        }}
      >
        <div
          id="modalContent"
          className="bg-white w-full max-w-3xl mx-auto mt-8 rounded-lg shadow-lg p-8 transform -translate-y-full transition-transform duration-300 ease-out h-[20vh]"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-center">Complete Your Purchase</h2>
            <Button
              className="sm:gap-2 w-full flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 py-6 font-bold text-white"
              onClick={onPokClick}
            >
              Pay with <Image src={pokWhiteSvg as StaticImport} alt="POK" />{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
