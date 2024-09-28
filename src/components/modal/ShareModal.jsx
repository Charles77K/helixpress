import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { IoLogoWechat } from 'react-icons/io5';
import { FaMendeley, FaRedditAlien, FaXTwitter } from 'react-icons/fa6';
import { IoMdMail, IoMdClose } from 'react-icons/io';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const ShareModal = forwardRef(function ShareModal({ link, onClose }, ref) {
  const dialog = useRef(); // Reference for the dialog element
  const inputRef = useRef(); // Reference for the input element

  // Disable scroll
  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  // Enable scroll
  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  };

  // Use `useImperativeHandle` to allow parent components to control the modal
  useImperativeHandle(ref, () => ({
    open: () => {
      disableScroll(); // Disable scroll when modal opens
      dialog.current.showModal();
    },
    close: () => {
      enableScroll(); // Enable scroll when modal closes
      dialog.current.close();
    },
  }));

  useEffect(() => {
    // Clean up: Enable scroll when component is unmounted
    return () => {
      enableScroll();
    };
  }, []);

  // Function to handle the copy action
  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        inputRef.current.select(); // Highlight the text
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

  return createPortal(
    <dialog
      ref={dialog}
      open={false}
      className="px-20 py-12 rounded-md shadow-lg w-[38%] bg-white space-y-6 backdrop:bg-[rgba(0,0,0,0.6)]"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-slate-800 text-2xl font-bold">Share Link</h1>
        <button
          onClick={() => {
            dialog.current.close();
            enableScroll(); // Enable scroll on modal close
            if (onClose) onClose();
          }}
        >
          <IoMdClose size={24} />
        </button>
      </div>

      {/* social media icons */}
      <div className="flex gap-2">
        <Link className="p-1 bg-slate-800 rounded-md">
          <IoMdMail color="white" size={20} />
        </Link>
        <Link className="p-1 bg-slate-800 rounded-md">
          <FaXTwitter color="white" size={20} />
        </Link>
        <Link className="p-1 bg-slate-800 rounded-md hover:bg-blue-400">
          <FaLinkedinIn color="white" size={20} />
        </Link>
        <Link className="p-1 bg-slate-800 rounded-md hover:bg-blue-500">
          <FaFacebookF color="white" size={20} />
        </Link>
        <Link className="p-1 bg-slate-800 rounded-md hover:bg-green-500">
          <IoLogoWechat color="white" size={20} />
        </Link>
        <Link className="p-1 bg-slate-800 rounded-md">
          <FaRedditAlien color="white" size={20} />
        </Link>
        <Link className="p-1 bg-slate-800 rounded-md hover:bg-red-500">
          <FaMendeley color="white" size={20} />
        </Link>
      </div>

      {/* link input and copy button */}
      <div className="flex gap-4">
        <input
          ref={inputRef}
          value={link}
          readOnly
          className="border text-xs w-full bg-gray-200 px-2 rounded-md"
        />
        <button
          onClick={handleCopy}
          className="hover:bg-slate-700 text-xs border-[1px] border-slate-800 text-slate-800 px-10 py-1.5 hover:text-white rounded-md transition-bg ease-in-out duration-300"
        >
          Copy
        </button>
      </div>
    </dialog>,
    document.getElementById('modal') // Assuming 'modal' div exists in your HTML
  );
});

export default ShareModal;
