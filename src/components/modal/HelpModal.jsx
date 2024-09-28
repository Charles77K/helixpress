import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';

const HelpModal = forwardRef(function HelpModal({ onClose }, ref) {
  const dialog = useRef();

  // Helper function to prevent scrolling
  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  // Helper function to restore scrolling
  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      disableScroll();
      dialog.current.showModal();
    },
    close: () => {
      enableScroll();
      dialog.current.close();
    },
  }));

  useEffect(() => {
    // Clean up in case the modal is unmounted without closing
    return () => {
      enableScroll();
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialog}
      open={false}
      className="md:px-20 md:py-12 rounded-md shadow-lg w-[50%] h-[60%] bg-white space-y-6 backdrop:bg-[rgba(0,0,0,0.6)]"
    >
      <div className="flex justify-between items-start">
        <h1 className="text-slate-800 text-2xl font-bold">Need Help?</h1>
        <button
          onClick={() => {
            dialog.current.close();
            enableScroll(); // Restore scroll when closed
            if (onClose) onClose();
          }}
        >
          <IoMdClose size={24} />
        </button>
      </div>
      <div className="w-full grid grid-cols-2 gap-8">
        <section className="w-full">
          <h1 className="text-slate-700 text-xl font-bold">Support</h1>
          <p className="text-xs leading-5">
            Find support for a specific problem in the support section of our
            website.
          </p>
          <button className="hover:bg-slate-700 w-full text-xs border-[1px] border-slate-800 text-slate-800 px-10 py-1.5 hover:text-white rounded-md transition-bg ease-in-out duration-300">
            Get Support
          </button>
        </section>
        <section className="w-full">
          <h1 className="text-slate-700 text-xl font-bold">Feedback</h1>
          <p className="text-xs leading-5">
            Please let us know what you think of our products and services.
          </p>
          <button className="hover:bg-slate-700 w-full text-xs border-[1px] border-slate-800 text-slate-800 px-10 py-1.5 hover:text-white rounded-md transition-bg ease-in-out duration-300">
            Give Feedback
          </button>
        </section>
        <section className="w-full">
          <h1 className="text-slate-700 text-xl font-bold">Information</h1>
          <p className="text-xs leading-5">
            Visit our dedicated information section to learn more about MDPI.
          </p>
          <button className="hover:bg-slate-700 w-full text-xs border-[1px] border-slate-800 text-slate-800 px-10 py-1.5 hover:text-white rounded-md transition-bg ease-in-out duration-300">
            Get Information
          </button>
        </section>
      </div>
    </dialog>,
    document.getElementById('share-modal')
  );
});

export default HelpModal;
