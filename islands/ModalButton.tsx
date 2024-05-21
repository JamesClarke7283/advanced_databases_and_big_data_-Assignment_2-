
import { JSX } from 'preact'; // Ensure JSX is imported for correct typings

interface ModalProps {
  id: string;
  title: string;
  content: JSX.Element | string;
}

export default function ModalButton({ id, title, content }: ModalProps) {
  return (
    <>
      <button
        id={`${id}-btn`}
        className="btn flex items-center justify-between border rounded-lg p-4 gap-4 hover:shadow-md transition-all"
        onClick={() => (document.getElementById(`${id}-modal`) as HTMLDialogElement)?.showModal()}
      >
        <div>{title}</div>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </svg>
      </button>
      <dialog id={`${id}-modal`} className="modal">
        <div className="modal-box">
          {typeof content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            content
          )}
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

