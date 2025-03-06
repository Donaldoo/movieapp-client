import { httpClient } from "../httpClient";

export interface MovieVideo {
    title: string,
    videoUrl: string,
    price: number,
    rentPrice: number,
    description: string,
    thumbnailUrl: string
}

export default function getMovieById(movieId: string): Promise<MovieVideo> {
    return httpClient.get("api/movie?Id=" + movieId)
}