import { CircleDollarSign, PlayCircle } from "lucide-react";

interface MovieCardProps {
  id: string;
  title: string;
  videoUrl: string;
  overview: string;
  price: number;
  isPurchased: boolean;
  isAuth: boolean;
  rentPrice: number;
}

export default function MovieCard({
  id,
  title,
  videoUrl,
  overview,
  price,
  isPurchased,
  isAuth,
  rentPrice,
}: MovieCardProps) {
  return (
    <div className="text-white">
      <button className="-mt-14">
        {isPurchased ? (
          <PlayCircle className="h-20 w-20" />
        ) : (
          <CircleDollarSign className="h-20 w-20" />
        )}
      </button>

      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 justify-between">
          {!isPurchased ? (
            <>
              <p className="font-normal text-sm">Buy fee: {price} EUR</p>
              <p className="font-normal text-sm">Rent fee: {rentPrice} EUR</p>
            </>
          ) : (
            <p className="font-normal text-green-500">You have bought this movie</p>
          )}
        </div>
        <p className="line-clamp-2 text-sm text-gray-200 font-light mt-1">
          {overview}
        </p>
      </div>
    </div>
  );
}
