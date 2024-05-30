import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import ModalButton from "./ModalButton.tsx";
import JSONTable from "../components/JSONTable.tsx";

interface CountryWithMovies {
  country: string;
  movieCount: number;
}

export default function CountriesWithMostMoviesModal() {
  const [countriesWithMostMovies, setCountriesWithMostMovies] = useState<CountryWithMovies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getCountriesWithMostMovies() {
      try {
        const response = await fetch("/api/countries_with_most_movies");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setCountriesWithMostMovies(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getCountriesWithMostMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ModalButton 
      id="countries-with-most-movies" 
      title="Show Countries with Most Movies" 
      content={<JSONTable data={countriesWithMostMovies} />} 
    />
  );
}
