import { useSearchParams, useNavigate } from 'react-router-dom';
import DoubleGridLayout from '../layouts/DoubleGridLayout';
import { useFetch } from '../services/hooks';
import Error from '../utils/Error';
import NotFound from '../components/NotFound';
import Article from '../components/Article';
import { useEffect } from 'react';
import SkeletonArticle from '../components/LoadingSkeletons/SkeletonArticle';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract all possible search parameters
  const title = searchParams.get('title') || '';
  const author = searchParams.get('author') || '';
  const journal = searchParams.get('journal') || '';

  // Build API query string
  const buildApiQueryString = () => {
    const apiParams = new URLSearchParams();

    if (title) apiParams.append('title', title);
    if (author) apiParams.append('author', author);
    if (journal) apiParams.append('journal', journal);

    return apiParams.toString();
  };

  const apiQueryString = buildApiQueryString();

  // Get search results from API
  const { data, isPending, isError, error, refetch } = useFetch(
    `/papers/search/?${apiQueryString}`
  );

  // refetch data if any of these parameters change
  useEffect(() => {
    refetch();
  }, [title, author, journal, refetch]);

  let content;

  if (isPending) {
    content = <SkeletonArticle />;
  } else if (isError) {
    content = (
      <Error
        title={'Error'}
        text={`${error.message || 'An unexpected error occurred'}`}
        onRetry={() => refetch()}
      />
    );
  } else if (data.results && data.results.length > 0) {
    content = (
      <div className="flex flex-col gap-2">
        {data.results.map((item) => (
          <Article item={item} key={item.id} />
        ))}
      </div>
    );
  } else {
    content = (
      <NotFound
        label="Articles"
        message="We couldn't find any results for your search. Try using different keywords."
        actionText="Go Back"
        onAction={() => navigate(-1)}
      />
    );
  }

  return (
    <DoubleGridLayout
      link={`search`}
      title={`Search Results (${!isPending && data?.results.length})`}
    >
      <>
        <div>
          <h5 className="text-sm font-light">Search Parameters</h5>
          {title && (
            <p className="text-xs font-light text-slate-800">
              <span className="font-bold">Title</span> = {title}
            </p>
          )}
          {author && (
            <p className="text-xs font-light text-slate-800">
              <span className="font-bold">Author</span> = {author}
            </p>
          )}
          {journal && (
            <p className="text-xs font-light text-slate-800">
              <span className="font-bold">Journal</span> = {journal}
            </p>
          )}
        </div>
        {content}
      </>
    </DoubleGridLayout>
  );
};

export default SearchPage;
