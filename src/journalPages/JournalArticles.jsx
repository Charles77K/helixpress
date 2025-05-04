import { useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Error from '../utils/Error';
import SkeletonArticle from '../components/LoadingSkeletons/SkeletonArticle';
import PropTypes from 'prop-types';
import { useFetchById } from '../services/hooks';
import NotFound from '../components/NotFound';
import Article from '../components/Article';

export default function JournalArticles({ journalId }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data,
    isPending: isPapersLoading,
    isError: isPapersError,
  } = useFetchById(`/journals/:id/papers/`, journalId);

  const papersData = !isPapersLoading && data?.results;

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
    content = papersData.map((papers) => (
      <Article item={papers} key={papers.id} />
    ));
  } else {
    content = (
      <NotFound
        label="Articles"
        message={'No articles found for this Journal'}
      />
    );
  }

  return (
    <div className="p-4 bg-white mt-5 md:mt-0">
      <div className="flex items-center justify-between">
        <h2 className="font-bold my-1">Latest Articles</h2>
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

JournalArticles.propTypes = {
  journalId: PropTypes.string.isRequired,
};
