import { useState } from "react";
import type { MovieReview } from "../types/review";

// Tipo para la película seleccionada en el formulario de reseña
type SelectedMovie = {
  id: number;
  name: string;
};

export function useReviews() {
  const [reviews, setReviews] = useState<MovieReview[]>([]);

  function addPositiveReview(movie: SelectedMovie, message: string) {
    setReviews((prev) => [
      ...prev,
      {
        movieId: movie.id,
        movieName: movie.name,
        type: "positive",
        message,
      },
    ]);
  }

  function addNegativeReview(movie: SelectedMovie, message: string) {
    setReviews((prev) => [
      ...prev,
      {
        movieId: movie.id,
        movieName: movie.name,
        type: "negative",
        message,
      },
    ]);
  }

  return {
    reviews,
    addPositiveReview,
    addNegativeReview,
  };
}
