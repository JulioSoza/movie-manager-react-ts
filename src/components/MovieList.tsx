import React from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import GenericList from "./GenericList";
import MovieCard from "./MovieCard";
import AlertBox from "./AlertBox";
import type { Movie } from "../types/movie";

type MovieListProps = {
  sourceUrl?: string;
  onSelect?: (movie: Movie) => void;
};

export default function MovieList({
  sourceUrl = "https://api.tvmaze.com/shows",
  onSelect,
}: MovieListProps) {
  const { data, loading, error } = useFetchMovies(sourceUrl);

  if (loading) {
    return <p>Cargando películas...</p>;
  }

  if (error) {
    return <AlertBox type="error">Error: {error}</AlertBox>;
  }

  if (!data.length) {
    return <p>No hay películas disponibles.</p>;
  }

  function handleSelect(movie: Movie) {
    if (onSelect) {
      onSelect(movie);
    }
  }

  return (
    <GenericList<Movie>
      items={data}
      keyExtractor={(m) => String(m.id)}
      renderItem={(m) => (
        <MovieCard
          movie={m}
          onSelect={() => handleSelect(m)}
        />
      )}
    />
  );
}
