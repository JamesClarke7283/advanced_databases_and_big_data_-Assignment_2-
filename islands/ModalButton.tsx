
interface ModalProps {
  id: string;
  title: string;
  content: JSXIntrensicElements;
}

export default function Component({id, title, content}: ModalProps) {
  return (
    <>
    <button class="flex items-center justify-between border rounded-lg p-4 gap-4 hover:shadow-md transition-all" onClick={()=>document.getElementById('{id}').showModal()}><div>{title}</div>
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
<dialog id="{id}" className="modal">
  <div className="modal-box">
    {content}
    <p className="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </>
  )
}

