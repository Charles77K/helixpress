import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getJournal } from './journalhttp';
import Loader from '../UI/Loader';
import Error from '../utils/Error';
import { TiLockOpen } from 'react-icons/ti';
import { RecentArticles } from '../components/homeComponents';

export default function CurrentJournal() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['journal', id],
    queryFn: ({ signal, queryKey }) => {
      const journalId = queryKey[1];
      return getJournal({ signal, journalId });
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  let content;
  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <Loader />;
      </div>
    );
  } else if (isError) {
    content = <Error text={'Error fetching journals'} title={'Error!!'} />;
  } else if (data && !data.length > 0) {
    content = (
      <div className="text-sm">
        <img
          src={`https://ogbesomto.pythonanywhere.com/${data.pic}`}
          className="w-full h-auto md:h-[23rem]"
        />
        {/* journal description */}
        <h2 className="font-bold text-xl p-3">Journal Description</h2>

        <div className={'flex flex-col items-start gap-4 p-4'}>
          <p className="text-slate-800 font-bold text-2xl italic">
            {data.name}
          </p>
          <p className="text-[13px] font-normal">{data.about}</p>
          {/* list of some attributes */}
          <ul className="list-disc ml-4 space-y-3">
            <li className="disc">
              <span className="bg-slate-600 hover:underline text-white p-0.5">
                Open Access{' '}
              </span>{' '}
              - free for readers, with article processing charges (APC) paid by
              authors or their institutions.
            </li>
            <li>
              {' '}
              <span className="font-bold">High visibility: </span>{' '}
              {data.visibility}
            </li>
            <li>
              {' '}
              <span className="font-bold">Journal rank: </span> {data.rank}
            </li>
            <li>
              {' '}
              <span className="font-bold">Rapid publication: </span>{' '}
              {data.rapid_publication}
            </li>
            <li>
              {' '}
              <span className="font-bold">Recognition of reviewers: </span>{' '}
              reviewers who provide timely, thorough peer-review reports receive
              vouchers entitling them to a discount on the APC of their next
              publication in any MDPI journal, in appreciation of the work done.
            </li>
          </ul>
          <p className="p-1">
            <span className="font-bold">Impact Factor: </span> {data.impact}
            (2024)
          </p>
          <div className="flex gap-5 my-2 md:my-0">
            <Link
              className="flex gap-1 items-center"
              to={'/information/access'}
            >
              <TiLockOpen size={15} color="orange" />
              <p className="text-orange-400">Open Access</p>
            </Link>
            <p className="font-semibold">ISSN: {data.issn}</p>
          </div>
        </div>
      </div>
    );
  } else {
    content = <p>No journal found</p>;
  }

  return (
    <div className="w-full">
      <div className="bg-white">{content}</div>
      <div className="mt-5">
        <RecentArticles />
      </div>
    </div>
  );
}
