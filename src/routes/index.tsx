import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import ModalButton from "../islands/ModalButton.tsx";
import AdventureGenreRolesModal from "../islands/AdventureGenreRolesModal.tsx";
import GenreCountryViewModal from "../islands/GenreCountryViewModal.tsx";
import HighestAvgScoreModal from "../islands/HighestAvgScoreModal.tsx";
import AverageMovieScoresModal from "../islands/AverageMovieScoresModal.tsx";
import CountriesWithMostMoviesModal from "../islands/CountriesWithMostMoviesModal.tsx";
import MoviesByGenreAndYear from "../islands/MoviesByGenreAndYear.tsx"

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
            <h3 className="text-center">Mysql</h3>
            <div className="p-6 flex flex-col gap-4">
              <AdventureGenreRolesModal/>
              <GenreCountryViewModal/>
              <HighestAvgScoreModal/>
            </div>
            <h3 className="text-center">MongoDB</h3>
            <div className="p-6 flex flex-col gap-4">
              <AverageMovieScoresModal/>
              <CountriesWithMostMoviesModal/>
              <MoviesByGenreAndYear/>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
