import React, { useMemo, useState } from "react";
import type { Movie } from "../types/movie";
import { formatMovie } from "../utils/formatMovie";

export default function FavoriteMovies() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  function addFavorite(movie: Movie) {
    setFavorites((prev) => {
      const already = prev.some((m) => m.id === movie.id);
      if (already) return prev;
      return [...prev, movie];
    });
  }

  function removeFavorite(id: number) {
    setFavorites((prev) => prev.filter((m) => m.id !== id));
  }

  const averageRating = useMemo(() => {
    if (favorites.length === 0) return 0;
    const nums = favorites.map((m) => m.rating?.average ?? 0);
    const sum = nums.reduce((acc, n) => acc + n, 0);
    const avg = sum / nums.length;
    return Number(avg.toFixed(2));
  }, [favorites]);

  return (
    <div className="section">
      <h2 className="section-title">Mis Favoritas</h2>

      {favorites.length === 0 ? (
        <p className="review-empty">No hay películas favoritas aún.</p>
      ) : (
        <>
          <ul className="fav-list">
            {favorites.map((m) => (
              <li key={m.id}>
                {formatMovie(m)}{" "}
                <button
                  className="btn-inline"
                  onClick={() => removeFavorite(m.id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <div className="fav-average">Promedio: {averageRating}</div>
        </>
      )}

      {favorites.length === 0 && (
        <div className="fav-average">Promedio: {averageRating}</div>
      )}

      <div className="fav-header-row">
        <button
          className="btn-inline"
          onClick={() =>
            addFavorite({
              id: 1,
              name: "Inception",
              language: "English",
              genres: ["Action", "Sci-Fi"],
              status: "Ended",
              rating: { average: 9 },
            })
          }
        >
          + Inception
        </button>

        <button
          className="btn-inline"
          onClick={() =>
            addFavorite({
              id: 2,
              name: "Interstellar",
              language: "English",
              genres: ["Adventure", "Drama", "Sci-Fi"],
              status: "Ended",
              rating: { average: 8 },
            })
          }
        >
          + Interstellar
        </button>
      </div>
    </div>
  );
}
