import { forwardRef, useImperativeHandle, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { createPortal } from 'react-dom';

const ShareModal = forwardRef(function ShareModal({ link, onClose }, ref) {
  const dialog = useRef(); // Reference for the dialog element
  const inputRef = useRef(); // Reference for the input element

  // Use `useImperativeHandle` to allow parent components to control the modal
  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(), // Function to open modal
    close: () => dialog.current.close(), // Function to close modal
  }));

  // Function to handle the copy action
  const handleCopy = () => {
    inputRef.current.select(); // Highlight the text
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

  return createPortal(
    <dialog ref={dialog} open={false} className="p-4 rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1>Share Link</h1>
        <button
          onClick={() => {
            dialog.current.close();
            if (onClose) onClose();
          }}
        >
          <IoMdClose size={24} />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <input
          ref={inputRef}
          value={link}
          readOnly
          className="border p-2 rounded"
        />
        <button
          onClick={handleCopy}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Copy
        </button>
      </div>
    </dialog>,
    document.getElementById('modal') // Assuming 'modal' div exists in your HTML
  );
});

export default ShareModal;
