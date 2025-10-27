import type { Movie } from "../types/movie";

export function formatMovie(m: Movie): string {
  const genres = m.genres.join(", ");
  const rating = m.rating?.average ?? 0;
  return `${m.name} (${genres}) – Rating: ${rating}/10`;
}
