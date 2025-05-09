import { useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Error from '../../utils/Error';
import SkeletonArticle from './../LoadingSkeletons/SkeletonArticle';

import { useFetch } from '../../services/hooks';
import Article from '../Article';

export default function RecentArticles() {
  const [isOpen, setIsOpen] = useState(true);
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
        <Error text="An Error occurred while fetching paper" title="Error!!" />
      </div>
    );
  } else if (papersData && papersData.length > 0) {
    content = papersData.map((paper) => (
      <Article item={paper} key={paper.id} />
    ));
  }

  return (
    <div className="p-4 bg-white mt-5 mb-1 md:mt-0">
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
