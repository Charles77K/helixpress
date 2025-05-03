import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaFilePdf } from 'react-icons/fa';

const Article = ({ item }) => {
  return (
    <ul className="mt-4 md:w-full">
      <hr className="py-3"></hr>
      <li>
        <div className="flex justify-between items-start text-xs">
          <section className="flex flex-wrap gap-2 items-center">
            <p className="p-1 bg-slate-800 text-white">Open access</p>
            <p className="p-1 bg-red-500 text-white">Article</p>
          </section>
          <p className="group relative text-slate-800 text-xs cursor-pointer mr-4">
            <a
              href={item.document}
              download
              target="_blank"
              className="flex items-center space-x-2 text-slate-700"
            >
              <FaFilePdf size={20} />
            </a>
            <span className="w-20 text-xs hidden group-hover:block absolute bg-slate-800 text-white top-6 left-5 p-1">
              Article PDF
            </span>
          </p>
        </div>
        <Link to={`/paper/${item.id}`}>
          <h2 className="text-slate-800 my-3 hover:underline cursor-pointer font-bold">
            {item.title}
          </h2>
        </Link>
        <p className="text-xs text-slate-800">
          by<span className="font-bold">{' ' + item.author}</span>
        </p>
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
};

Article.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    author: PropTypes.string,
    institution: PropTypes.string,
    keywords: PropTypes.string,
    articleId: PropTypes.string,
    doi: PropTypes.string,
    date_created: PropTypes.string,
    abstract: PropTypes.string,
    specialIssue: PropTypes.string,
    document: PropTypes.string,
  }),
};

export default Article;
