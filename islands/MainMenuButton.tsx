interface MainMenuButtonProps {
  onClick: () => void;
  title: string;
}

export function MainMenuButton({ onClick, title }: MainMenuButtonProps) {
  return (
    <button
      class="flex items-center justify-between border rounded-lg p-4 gap-4 hover:shadow-md transition-all"
      onClick={onClick}
    >
      <div>{title}</div>
      <svg
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 9l-7 7-7-7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></path>
      </svg>
    </button>
  );
}