export interface Movie {
  readonly id: number;
  name: string;
  language: string;
  genres: string[];
  status: string;
  rating: { average: number | null };
  image?: { medium: string; original: string };
  summary?: string;
  officialSite?: string;
}
