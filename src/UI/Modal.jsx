import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

export default function Modal({
  onClose,
  onDelete,
  onCloseModal,
  isDisabled,
  submitting,
  deleteText,
  title,
  isDeleting,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const modal = dialogRef.current;

    if (modal) {
      modal.setAttribute('open', ''); // Open the modal
    }

    return () => {
      if (modal) {
        modal.removeAttribute('open'); // Close the modal when unmounting
      }
    };
  }, []);

  return createPortal(
    <div className="p-4 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <dialog
        ref={dialogRef}
        className="bg-white p-6 min-[400px]:p-12 rounded shadow-md relative"
        onClose={onClose}
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            disabled={isDisabled}
          >
            {submitting ? `${isDeleting}....` : `${deleteText}`}
          </button>
          <button
            onClick={onCloseModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            disabled={isDisabled}
          >
            No
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute text-3xl text-red-600 top-2 right-2 hover:text-gray-800"
        >
          &times;
        </button>
      </dialog>
    </div>,
    document.getElementById('ui-modal') // Ensure there is a div with id 'ui-modal' in the DOM
  );
}
