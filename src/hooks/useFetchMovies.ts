import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";

type ApiMovie = {
  id: number;
  name: string;
  language: string;
  genres: string[];
  status: string;
  rating?: { average: number | null };
  image?: { medium: string; original: string };
  summary?: string | null;
  officialSite?: string | null;
};

function toMovie(api: ApiMovie): Movie {
  return {
    id: api.id,
    name: api.name,
    language: api.language,
    genres: api.genres ?? [],
    status: api.status,
    rating: { average: api.rating?.average ?? null },
    image: api.image
      ? { medium: api.image.medium, original: api.image.original }
      : undefined,
    summary: api.summary ?? undefined,
    officialSite: api.officialSite ?? undefined,
  };
}

export function useFetchMovies(url: string) {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json() as Promise<ApiMovie[]>;
      })
      .then((json) => {
        if (!isMounted) return;
        const mapped = Array.isArray(json) ? json.map(toMovie) : [];
        setData(mapped);
      })
      .catch((e: unknown) => {
        if (!isMounted) return;
        const message = e instanceof Error ? e.message : "Error desconocido";
        setError(message);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
