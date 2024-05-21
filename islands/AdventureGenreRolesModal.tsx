
import { useState, useEffect } from "preact/hooks";
import { fetchAdventureGenreRoles } from "../dataFetcher.ts";
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
      const roles = await fetchAdventureGenreRoles();
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
          {adventureRoles.map(role => (
            <li key={role.name + role.surname}>{role.name} {role.surname}</li>
          ))}
        </ul>
      } 
    />
  );
}

