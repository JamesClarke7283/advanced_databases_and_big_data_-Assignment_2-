import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import ModalButton from "./ModalButton.tsx";
import JSONTable from "../components/JSONTable.tsx";

interface AverageMovieScore {
  _id: string;
  averageScore: number;
}

export default function AverageMovieScoresModal() {
  const [averageMovieScores, setAverageMovieScores] = useState<AverageMovieScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getAverageMovieScores() {
      try {
        const response = await fetch("/api/average_movie_scores");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setAverageMovieScores(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getAverageMovieScores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ModalButton 
      id="average-movie-scores" 
      title="Show Average Movie Scores" 
      content={<JSONTable data={averageMovieScores} />} 
    />
  );
}
