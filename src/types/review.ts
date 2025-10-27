export type MovieReview = {
  movieId: number;
  movieName: string;
  type: "positive" | "negative";
  message: string;
};
