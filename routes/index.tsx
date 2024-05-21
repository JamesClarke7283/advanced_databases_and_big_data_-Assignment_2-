import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import ModalButton from "../islands/ModalButton.tsx";
import AdventureGenreRolesModal from "../islands/AdventureGenreRolesModal.tsx";
import { fetchAdventureGenreRoles, fetchGenreByCountry, fetchHorrorMovieLanguages, fetchMostActiveUsers } from "../dataFetcher.ts";

// Define the type for the props
interface HomePageProps {
  adventureRoles: { name: string, surname: string }[];
  genreByCountry: { country: string, genre: string, movie_count: number }[];
  horrorLanguages: string[];
  mostActiveUsers: { username: string, watch_count: number }[];
}

// Fetch data in the handler
export const handler: Handlers<HomePageProps> = {
  async GET(_, ctx) {
    const adventureRoles = await fetchAdventureGenreRoles();
    const genreByCountry = await fetchGenreByCountry();
    const horrorLanguages = await fetchHorrorMovieLanguages();
    const mostActiveUsers = await fetchMostActiveUsers();

    return ctx.render({ adventureRoles, genreByCountry, horrorLanguages, mostActiveUsers });
  }
}

// Component to render the home page
export default function Home({ data }: PageProps<HomePageProps>) {
  return (
    <>
      <link rel="stylesheet" href="/frontpage.css" />
      <div className="flex flex-col w-full min-h-screen">
        <main className="flex items-center justify-center flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl p-8" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6 pb-0">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Movie Database Queries
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore the movie database using the following queries.
              </p>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h4 className="text-xl font-semibold">Adventure Genre Roles</h4>
              <AdventureGenreRolesModal/>
              <h4 className="text-xl font-semibold">Genre by Country</h4>
              <ModalButton id="genre-country" title="Show Genre by Country" content={
                <ul>
                  {data.genreByCountry.map(item => (
                    <li key={item.country + item.genre}>{item.country} - {item.genre} ({item.movie_count})</li>
                  ))}
                </ul>
              } />
              
              <h4 className="text-xl font-semibold">Horror Movie Languages</h4>
              <ModalButton id="horror-languages" title="Show Horror Movie Languages" content={
                <ul>
                  {data.horrorLanguages.map(language => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
              } />
              
              <h4 className="text-xl font-semibold">Most Active Users</h4>
              <ModalButton id="active-users" title="Show Most Active Users" content={
                <ul>
                  {data.mostActiveUsers.map(user => (
                    <li key={user.username}>{user.username} - {user.watch_count} movies</li>
                  ))}
                </ul>
              } />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
