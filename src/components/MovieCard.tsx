import { CircleDollarSign, PlayCircle } from "lucide-react";

interface MovieCardProps {
  id: string;
  title: string;
  videoUrl: string;
  overview: string;
  price: number;
  isPurchased: boolean;
  isAuth: boolean;
}

export default function MovieCard({
  id,
  title,
  videoUrl,
  overview,
  price,
  isPurchased,
  isAuth,
}: MovieCardProps) {
  return (
    <div className='text-white'>
      <button className='-mt-14'>
        {isPurchased ? (
          <PlayCircle className='h-20 w-20' />
        ) : (
          <CircleDollarSign className='h-20 w-20' />
        )}
      </button>

      <div className='p-5 absolute bottom-0 left-0'>
        <h1 className='font-bold text-lg line-clamp-1'>{title}</h1>
        <div className='flex gap-x-2 items-center'>
          <p className='font-normal text-sm'>{price} EUR</p>
        </div>
        <p className='line-clamp-2 text-sm text-gray-200 font-light mt-1'>
          {overview}
        </p>
      </div>
    </div>
  );
}
