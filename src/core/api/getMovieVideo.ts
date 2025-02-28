import { httpClient } from "../httpClient";
import { MovieVideo } from "./getMovieById";

export default function getMovieVideo(movieId: string): Promise<MovieVideo> {
    return httpClient.get(`api/movie-video?MovieId=${movieId}`)
}