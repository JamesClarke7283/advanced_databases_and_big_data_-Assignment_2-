import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import ModalButton from "./ModalButton.tsx";
import JSONTable from "../components/JSONTable.tsx";

interface Movie {
  title: string;
  genre: string;
  year: number;
}

export default function MoviesByGenreAndYearModal() {
  const [moviesByGenreAndYear, setMoviesByGenreAndYear] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getMoviesByGenreAndYear() {
      try {
        const response = await fetch("/api/movies_by_genre_and_year");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setMoviesByGenreAndYear(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getMoviesByGenreAndYear();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ModalButton 
      id="movies-by-genre-and-year" 
      title="Show Movies by Genre and Year" 
      content={<JSONTable data={moviesByGenreAndYear} />} 
    />
  );
}
