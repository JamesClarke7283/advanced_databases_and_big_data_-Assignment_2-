import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import ModalButton from "./ModalButton.tsx";
import JSONTable from "../components/JSONTable.tsx";

interface GenreCountry {
  country: string;
  genre: string;
  num_movies: number;
}

export default function GenreCountryViewModal() {
  const [genreCountryView, setGenreCountryView] = useState<GenreCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getGenreCountryView() {
      try {
        const response = await fetch("/api/genre_country_view");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setGenreCountryView(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getGenreCountryView();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ModalButton 
      id="genre-country-view" 
      title="Show Genre Country View" 
      content={<JSONTable data={genreCountryView} />} 
    />
  );
}
