import React, { useState } from "react";
import Section from "./Section";
import MovieList from "./MovieList";
import { useReviews } from "../hooks/useReviews";
import { renderReview } from "../utils/renderReview";
import type { Movie } from "../types/movie";

type SelectedMovie = {
  id: number;
  name: string;
};

export default function MovieDashboard() {
  // reseñas globales
  const { reviews, addPositiveReview, addNegativeReview } = useReviews();

  // input de texto de la reseña
  const [draft, setDraft] = useState("");

  // película actualmente seleccionada para reseñar
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovie | null>(
    null
  );

  function handleSelectMovie(movie: Movie) {
    setSelectedMovie({ id: movie.id, name: movie.name });
    // setDraft("");
  }

  function handleAddPositive() {
    if (!selectedMovie) return;
    if (!draft.trim()) return;

    addPositiveReview(selectedMovie, draft.trim());
    setDraft("");
  }

  function handleAddNegative() {
    if (!selectedMovie) return;
    if (!draft.trim()) return;

    addNegativeReview(selectedMovie, draft.trim());
    setDraft("");
  }

  const isDisabled = !selectedMovie || !draft.trim();

  return (
    <div className="app-shell">
      <div className="dashboard">
        {/* Columna izquierda: Películas */}
        <div className="column">
          <Section title="Lista de Películas">
            <MovieList onSelect={handleSelectMovie} />
          </Section>
        </div>

        {/* Columna derecha: Reseñas */}
        <div className="column">
          <Section title="Reseñas">
            <div className="column" style={{ maxWidth: "360px" }}>
              {/* info de película seleccionada */}
              {selectedMovie ? (
                <div className="selected-movie-label">
                  Reseñando: {selectedMovie.name}
                </div>
              ) : (
                <div className="selected-movie-label selected-movie-label--empty">
                  Selecciona una película para reseñar
                </div>
              )}

              <input
                className="review-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Escribe tu reseña..."
                disabled={!selectedMovie}
              />

              <div className="fav-header-row">
                <button
                  className="btn-inline"
                  onClick={handleAddPositive}
                  disabled={isDisabled}
                >
                  + Positiva
                </button>

                <button
                  className="btn-inline"
                  onClick={handleAddNegative}
                  disabled={isDisabled}
                >
                  + Negativa
                </button>
              </div>

              {reviews.length === 0 ? (
                <p className="review-empty">Sin reseñas todavía.</p>
              ) : (
                <ul className="review-list">
                  {reviews.map((r, i) => (
                    <li key={i}>{renderReview(r)}</li>
                  ))}
                </ul>
              )}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
