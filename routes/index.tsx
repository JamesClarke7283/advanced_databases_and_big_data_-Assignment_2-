import { useSignal} from "@preact/signals";

import { MainMenuButton } from "../islands/MainMenuButton.tsx";

export default function Home() {

  const handleSearchEmployees = () => {
    // Handle search employees action
    console.log("Search Employees clicked");
  };

  const handleAddEmployee = () => {
    // Handle add employee action
    console.log("Add Employee clicked");
  };

  const handleAddDepartment = () => {
    // Handle add department action
    console.log("Add Department clicked");
  };

  return (
    <>
      <link rel="stylesheet" href="/frontpage.css" />
      <div class="flex flex-col w-full min-h-screen">
        <main class="flex items-center justify-center flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm p-8"
            data-v0-t="card"
          >
            <div class="flex flex-col space-y-1.5 p-6 pb-0">
              <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Employee Database
              </h3>
              <p class="text-sm text-muted-foreground">
                Query the employee database to find the information you need
              </p>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <MainMenuButton
                title="Search Employees"
                onClick={handleSearchEmployees}
              />
              <MainMenuButton
                title="Add Employee"
                onClick={handleAddEmployee}
              />
              <MainMenuButton
                title="Add Department"
                onClick={handleAddDepartment}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
