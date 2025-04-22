import { useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Error from '../../utils/Error';
import SkeletonArticle from './../SkeletonArticle';
import { Link } from 'react-router-dom';
import { FaFilePdf } from 'react-icons/fa';
import { useFetch } from '../../services/hooks';

export default function RecentArticles() {
  // Track the open state for each article
  // const [openStates, setOpenStates] = useState(
  //   Array(ARTICLES.length).fill(false)
  // );
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: papersData,
    isPending: isPapersLoading,
    isError: isPapersError,
  } = useFetch('/papers/');

  let content;
  if (isPapersLoading) {
    content = (
      <div className="flex justify-center">
        <SkeletonArticle />
      </div>
    );
  } else if (isPapersError) {
    content = (
      <div className="flex justify-center">
        <Error text="An Error occured while fetching paper" title="Error!!" />
      </div>
    );
  } else if (papersData && papersData.length > 0) {
    content = papersData.map((item) => (
      <ul key={item.id} className="mt-4 md:w-full">
        <hr className="py-3"></hr>
        <li>
          <div className="flex justify-between items-start text-xs">
            <section className="flex flex-wrap gap-2 items-center">
              <p className="p-1 bg-slate-800 text-white">Open access</p>
              <p className="p-1 bg-red-500 text-white">Article</p>
            </section>
            <p className="group relative text-slate-800 text-xs cursor-pointer mr-4">
              {/* Document download link */}
              <a
                href={`https://ogbesomto.pythonanywhere.com/${item.document}`}
                download
                target="_blank"
                className="flex items-center space-x-2 text-slate-700"
              >
                <FaFilePdf size={20} /> {/* PDF Icon */}
              </a>
              <span className="w-20 text-xs hidden group-hover:block absolute bg-slate-800 text-white top-6 left-5 p-1">
                Article PDF
              </span>
            </p>
          </div>
          {/* title and authors section */}
          <Link to={`/paper/${item.id}`}>
            <h2 className="text-slate-800 my-3 hover:underline cursor-pointer font-bold">
              {item.title}
            </h2>
          </Link>
          <p className="text-xs text-slate-800">
            by<span className="font-bold">{' ' + item.author}</span>
          </p>
          {/* section to render doi and date */}
          <section className="text-[13px] flex flex-wrap gap-1 my-1">
            <p className="text-gray-500 italic">{item.institution},</p>
            <p className="text-gray-500">{item.keywords}</p>
            <p className="text-gray-500">{item.articleId}</p>
            <p className="text-slate-800 hover:underline hover:cursor-pointer">
              {item.doi}
            </p>
            <p className="text-gray-500">
              -
              {' ' +
                new Date(item.date_created).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
            </p>
          </section>
          {/* abstract */}
          <>
            <section className="my-2">
              <p className="text-xs">
                <span className="font-bold text-slate-600">Abstract </span>
                {item.abstract}
                {/* <span className="underline font-bold text-xs hover:cursor-pointer">
                  {' '}
                  Full article
                </span> */}
              </p>
            </section>
          </>
          <p className="text-xs">
            (This article belongs to the Special Issue){' '}
            <span className="font-bold">{item.specialIssue}</span>
          </p>
        </li>
      </ul>
    ));
  }

  return (
    <div className="p-4 bg-white mt-5 md:mt-0">
      <div className="flex items-center justify-between">
        <h2 className="font-bold my-1">Recent Articles</h2>
        <button
          className="md:hidden text-slate-600 hover:underline"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoIosArrowUp size={23} /> : <IoIosArrowDown size={23} />}
        </button>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'block' : 'hidden'
        } md:block`}
      >
        {content}
      </div>
    </div>
  );
}
