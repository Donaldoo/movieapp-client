import { httpClient } from "../httpClient";

export type Movie = {
    id: string,
    title: string,
    description: string,
    thumbnailUrl: string,
    videoUrl: string,
    price: number,
    isPurchased: boolean
}

export default function getMovies(): Promise<Movie[]> {
    return httpClient.get("api/movies")
}