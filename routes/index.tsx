import { useSignal } from "@preact/signals";
import {MainMenuButton} from "../components/MainMenuButton.tsx"

export default function Home() {
  const count = useSignal(3);
  return (
<>
<link rel="stylesheet" href="/frontpage.css" />
<div class="flex flex-col w-full min-h-screen">
  <main class="flex items-center justify-center flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm p-8" data-v0-t="card">
      <div class="flex flex-col space-y-1.5 p-6 pb-0">
        <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Employee Database</h3>
        <p class="text-sm text-muted-foreground">Query the employee database to find the information you need</p>
      </div>
      <div class="p-6 flex flex-col gap-4">
        <a
          class="flex items-center justify-between border rounded-lg p-4 gap-4 hover:shadow-md transition-all"
          href="#"
          rel="ugc"
        >
          <div>Search Employees</div>
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
          </svg>
        </a>
        <a
          class="flex items-center justify-between border rounded-lg p-4 gap-4 hover:shadow-md transition-all"
          href="#"
          rel="ugc"
        >
          <div>Add Employee</div>
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
          </svg>
        </a>
        <a
          class="flex items-center justify-between border rounded-lg p-4 gap-4 hover:shadow-md transition-all"
          href="#"
          rel="ugc"
        >
          <div>Add Department</div>
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
          </svg>
        </a>
      </div>
    </div>
  </main>
</div>
</>
  );
}
