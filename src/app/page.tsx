import Header from "@/components/Header";
import MoviesList from "@/components/MoviesList";

export default function Home() {
  return (
    <>
      <Header />
      <div className='p-5 md:p-7 lg:px-28'>
        <h1 className='text-3xl font-bold'>Available movies</h1>
        <MoviesList />
      </div>
    </>
  );
}
