import Error from '../../utils/Error';
import { useFetchTopics } from '../components/Tanstack';

export default function ViewTopics() {
  const { topicsData, isTopicsLoading, isTopicsError } = useFetchTopics();

  let content;
  console.log(topicsData);
  if (isTopicsLoading) {
    content = <p>Loading...</p>;
  } else if (isTopicsError) {
    content = <Error title="Error" text="Error fetching topics" />;
  } else if (topicsData && topicsData.length > 0) {
    content = topicsData.map((topic, index) => (
      <ul key={index} className="border-b border-gray-200 w-1/2 p-3 space-y-2">
        <div className="bg-slate-100 p-4 rounded-lg">
          <li className="text-[15px] font-bold text-gray-900">
            Title: {topic.title}
          </li>
          <li className="text-sm text-gray-700">Author: {topic.author}</li>
          <li className="text-sm text-gray-700">Keywords: {topic.keywords}</li>
          <li className="text-sm text-gray-700">
            Deadline: {new Date(topic.manuscript_deadline).toLocaleDateString()}
          </li>
        </div>
      </ul>
    ));
  } else {
    content = <p>No topics found</p>;
  }

  return (
    <div className="w-full min-h-screen h-full bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">View Topics</h2>
      <div>{content}</div>
    </div>
  );
}
