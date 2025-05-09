import PropTypes from 'prop-types';
import { useFetch, useFetchById } from '../../services/hooks';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import { useEffect } from 'react';
import Error from '../../utils/Error';

const JournalSubjectList = ({ id }) => {
  const fetchById = useFetchById('/subjects/:id/journals', id);
  const fetchAll = useFetch('/journals/');

  const subjects = id ? fetchById.data?.results : fetchAll.data;
  const isLoading = id ? fetchById.isLoading : fetchAll.isPending;
  const isError = id ? fetchById.isError : fetchAll.isError;
  const refetch = id ? fetchById.refetch : fetchAll.refetch;

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  let content;
  if (isLoading) {
    content = (
      <div className="flex flex-wrap items-center gap-5 animate-pulse">
        {Array.from({ length: 8 }).map((_, idx) => (
          <ul key={idx} className="border-b border-gray-200 p-2">
            <div className="group flex flex-col gap-2 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 bg-gray-300 rounded"></div>
                  <div className="h-9 w-44 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </ul>
        ))}
      </div>
    );
  } else if (isError) {
    content = <Error onRetry={() => refetch()} title={'Error'} />;
  } else if (subjects && subjects.length > 0) {
    content = (
      <div className="flex items-center gap-5">
        {subjects.map((item) => (
          <ul key={item.id} className="border-b border-gray-200 p-2">
            <Link
              to={`/journal/${item.name.replace(/\s+/g, '-').toLowerCase()}/${
                item.id
              }`}
            >
              <li className="group flex flex-col gap-2 text-slate-700 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.pic}
                      className="h-9 w-9 text-xs"
                      alt={`${item.name || 'N/A'}`}
                    />
                    <p className="text-sm font-bold hover:underline">
                      {item.name || 'N/A'}
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          </ul>
        ))}
      </div>
    );
  } else {
    content = (
      <NotFound
        label="Journal"
        message={'No journal found for this subject please try another'}
        className={'p-2'}
      />
    );
  }

  return <div className="">{content}</div>;
};

export default JournalSubjectList;

JournalSubjectList.propTypes = {
  id: PropTypes.string.isRequired,
};
