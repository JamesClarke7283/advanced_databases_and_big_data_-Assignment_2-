import { useState, useEffect } from "preact/hooks";
import ModalButton from "./ModalButton.tsx";
import JSONTable from "../components/JSONTable.tsx";

interface Role {
  name: string;
  surname: string;
}

export default function Component() {
  const [adventureRoles, setAdventureRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getAdventureRoles() {
      try {
        const response = await fetch("/api/adventure_genre_roles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setAdventureRoles(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getAdventureRoles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ModalButton 
      id="adventure-roles" 
      title="Show Adventure Genre Roles" 
      content={<JSONTable data={adventureRoles} />} 
    />
  );
}
