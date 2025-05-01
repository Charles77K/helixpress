import { Link, useNavigate, useParams } from 'react-router-dom';
import Share from '../components/Share';
import useScrollToTop from '../utils/scrollToTop';
import { News, Search } from '../components/homeComponents';
import SkeletonArticle from '../components/SkeletonArticle';
import Error from '../utils/Error';
import { saveAs } from 'file-saver';
import { useFetchById } from '../services/hooks';
import NotFound from '../components/NotFound';

export default function CurrentPaper() {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: item,
    isError: isCurrentPaperError,
    isPending: isCurrentPaperLoading,
    refetch,
  } = useFetchById('/papers/', id);

  const handleDownload = async () => {
    try {
      const baseUrl = 'https://helixpress-backend.vercel.app/'; // Adjust this to your API’s base URL
      const documentUrl = `${baseUrl}${item.document}`;

      const response = await fetch(documentUrl);
      if (!response.ok) throw new Error('Network response was not ok.');

      const blob = await response.blob();
      saveAs(blob, 'document.pdf'); // Downloads as "document.pdf"
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  let content;
  if (isCurrentPaperLoading) {
    content = (
      <div className="flex justify-center">
        <SkeletonArticle />
      </div>
    );
  } else if (isCurrentPaperError) {
    content = (
      <div className="flex justify-center">
        <Error
          text="An Error occurred while fetching paper"
          title="Error!!"
          onRetry={() => refetch()}
        />
      </div>
    );
  } else if (item && item.length !== 0) {
    content = (
      <ul key={item.id} className="mt-4 md:w-full">
        {/* <hr className="py-3"></hr> */}
        <li>
          <div className="flex justify-between items-start text-xs">
            <section className="flex flex-wrap gap-2 items-center">
              <p className="p-1 bg-slate-800 text-white">Open access</p>
              <p className="p-1 bg-red-500 text-white">Article</p>
            </section>
            <p className="text-slate-800 text-xs">
              <span>
                {' '}
                <button
                  onClick={handleDownload}
                  className="inline-block mt-2 px-4 py-2 bg-slate-600 text-white text-xs font-bold rounded hover:bg-slate-700"
                >
                  Download Document
                </button>
              </span>
            </p>
          </div>

          {/* title and authors section */}
          <h2 className="text-slate-800 my-3 font-bold">{item.title}</h2>
          <p className="text-xs text-slate-800">
            by<span className="font-bold">{' ' + item.author}</span>
          </p>

          {/* section to render DOI and date */}
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
          <section className="my-2">
            <p className="text-xs">
              <span className="font-bold text-slate-600">Abstract </span>
              {item.abstract}
            </p>
          </section>
          <p className="text-xs">
            (This article belongs to the Special Issue){' '}
            <span className="font-bold">{item.specialIssue}</span>
          </p>
        </li>
      </ul>
    );
  } else {
    content = (
      <NotFound
        label="Paper"
        actionText={'Go Back'}
        onAction={() => navigate(-1)}
      />
    );
  }

  return (
    <div className="bg-slate-100">
      <Search />
      <div className="flex p-4 gap-5 flex-col md:flex-row items-start justify-center text-slate-700">
        {/* First section */}
        <section className="flex-grow md:flex-grow-[1] md:basis-1/4 min-w-[10rem] w-full flex flex-col gap-3">
          <nav className="bg-white p-6">
            <h1 className="text-slate-700 text-xl font-bold">MDPI Journals</h1>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/journals"
                  className="italic block whitespace-nowrap py-1 hover:underline"
                >
                  <span className="text-gray-400">•</span>
                  Journal Name
                </Link>
                <Link
                  to="/journals/find"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  <span className="text-gray-400">•</span> Find a Journal
                </Link>
                <Link
                  to="/journals/proposal"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  <span className="text-gray-400">•</span> Journal Proposal
                </Link>
                <Link
                  to="/journals/proceeding"
                  className="block whitespace-nowrap py-1 hover:underline"
                >
                  <span className="text-gray-400">•</span> Proceeding Series
                </Link>
              </li>
            </ul>
          </nav>
          {/* Browse journal */}
          <div className="bg-white p-3 md:p-6"></div>
        </section>

        {/* Middle section (wider than the others) */}
        <section className="bg-white p-2 flex-grow md:flex-grow-[2] md:basis-[60%] min-w-[20rem] w-full flex flex-col">
          {content}
        </section>

        {/* Last section */}
        <section className="hidden flex-grow md:flex-grow-[1] md:basis-[25%] min-w-[10rem] w-full md:flex flex-col">
          <News />
          <Share linkToShare={'https://www.mdpi.com/about/journals/'} />
        </section>
      </div>
    </div>
  );
}
