export interface Movie {
  id: number | null;
  name: string;
  description: string;
  image: string;
  rating: number;
  genres: string[];
  inTheaters: boolean;
}
