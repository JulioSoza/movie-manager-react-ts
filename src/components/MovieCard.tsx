import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
  onSelect: () => void;
};

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  const rating = movie.rating?.average ?? 0;
  const imgSrc = movie.image?.medium ?? movie.image?.original;

  return (
    <div className="movie-card">
      {/* Poster */}
      <div className="movie-card-imgWrapper">
        {imgSrc ? (
          <img src={imgSrc} alt={movie.name} />
        ) : (
          <img
            src="https://via.placeholder.com/120x180?text=No+Image"
            alt={movie.name}
          />
        )}
      </div>

      {/* Info */}
      <div className="movie-card-body">
        <div className="movie-card-title">{movie.name}</div>

        <div className="movie-meta">
          <div>
            <span className="movie-meta-label">Géneros:</span>{" "}
            {movie.genres.length ? movie.genres.join(", ") : "N/D"}
          </div>
          <div>
            <span className="movie-meta-label">Status:</span> {movie.status}
          </div>
        </div>

        <div className="rating">Rating: {rating}/10</div>

        <button className="btn-cine" onClick={onSelect}>
          Seleccionar
        </button>
      </div>
    </div>
  );
}
