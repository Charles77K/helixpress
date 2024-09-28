import { useRef } from 'react';
import { BiSolidMessageError } from 'react-icons/bi';
import { GiShare } from 'react-icons/gi';
import ShareModal from './modal/ShareModal';
import HelpModal from './modal/HelpModal';

export default function Share({ linkToShare }) {
  const modalRef = useRef(); // Reference for ShareModal
  const shareRef = useRef();

  return (
    <div className="w-full">
      <div className="bg-white py-6 px-4 md:px-8 flex flex-col items-center gap-4">
        {/* Share Button with GiShare Icon */}
        <div className="group relative">
          <button onClick={() => modalRef.current.open()}>
            {' '}
            {/* Open modal using ref */}
            <GiShare size={30} aria-label="Share" />
          </button>
          <div className="hidden group-hover:block absolute left-5 top-6 transition-all duration-300">
            <p className="bg-slate-700 text-xs text-white px-2 py-0.5">Share</p>
          </div>
        </div>

        {/* Error Button with BiSolidMessageError Icon */}
        <div className="group relative">
          <button onClick={() => shareRef.current.open()}>
            <BiSolidMessageError size={30} aria-label="Error" />
          </button>
          <div className="hidden group-hover:block absolute left-5 top-6 transition-all duration-300">
            <p className="bg-slate-700 text-xs text-white px-2 py-0.5">Help</p>
          </div>
        </div>
      </div>

      {/* ShareModal Component */}
      <ShareModal
        ref={modalRef} // Pass ref to control modal
        link={linkToShare} // Pass the link
        onClose={() => console.log('Modal closed')} // Optional onClose handler
      />
      <HelpModal ref={shareRef} />
    </div>
  );
}
