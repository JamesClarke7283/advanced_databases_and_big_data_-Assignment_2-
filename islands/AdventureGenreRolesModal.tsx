
import { useState, useEffect } from "preact/hooks";
//import { fetchAdventureGenreRoles } from "../dataFetcher.ts";
import { fetch_adventure_genre_roles } from "../database/mysql/queries.ts";
import ModalButton from "./ModalButton.tsx";

interface Role {
  name: string;
  surname: string;
}

export default function Component() {
  const [adventureRoles, setAdventureRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAdventureRoles() {
      const roles = fetch_adventure_genre_roles();
      console.log(roles);
      setAdventureRoles(roles);
      setLoading(false);
    }
    getAdventureRoles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ModalButton 
      id="adventure-roles" 
      title="Show Adventure Genre Roles" 
      content={
        <ul>
        {adventureRoles} 
        </ul>
      } 
    />
  );
}

