import type { MovieReview } from "../types/review";

export function renderReview(r: MovieReview): string {
  if (r.type === "positive") {
    return `Opinión positiva sobre "${r.movieName}": ${r.message}`;
  }

  return `Opinión negativa sobre "${r.movieName}": ${r.message}`;
}
