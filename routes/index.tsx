import { useSignal} from "@preact/signals";
import ModalButton from "../islands/ModalButton.tsx"

export default function Home() {

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
            <ModalButton id="search-empolyees" title="Search Employees" content={<h1>Hello World!</h1>} />
              <ModalButton
                id="add-employee"
                title="Add Employee"
                content={<h1>Hello World 2</h1>}
              />
              <ModalButton
                id="add-department"
                title="Add Department"
                content={<h1>Hello World 3</h1>}
              />
              
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
