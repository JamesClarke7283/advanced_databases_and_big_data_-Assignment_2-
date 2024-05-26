import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import ModalButton from "./ModalButton.tsx";
import JSONTable from "../components/JSONTable.tsx";

interface HighestAvgScore {
  title: string;
  average_score: number;
  num_users: number;
}

export default function HighestAvgScoreModal() {
  const [highestAvgScores, setHighestAvgScores] = useState<HighestAvgScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getHighestAvgScores() {
      try {
        const response = await fetch("/api/highest_avg_score");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setHighestAvgScores(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getHighestAvgScores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ModalButton 
      id="highest-avg-scores" 
      title="Show Highest Average Scores" 
      content={<JSONTable data={highestAvgScores} />} 
    />
  );
}
