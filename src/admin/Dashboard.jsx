import {
  useFetchAuthors,
  useFetchJournals,
  useFetchNews,
  useFetchNewsLetters,
} from './components/Tanstack';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function Dashboard() {
  const { data: journal = [] } = useFetchJournals() || {};
  const { newsData: news = [] } = useFetchNews() || {};
  const { newsLetterData: newsletter = [] } = useFetchNewsLetters() || {};
  const { authorsData: authors = [] } = useFetchAuthors() || {};

  const ChartData = [
    { name: 'Journals', count: journal.length },
    { name: 'News', count: news.length },
    { name: 'Newsletters', count: newsletter.length },
    { name: 'Authors', count: authors.length },
  ];

  return (
    <main className="w-full h-screen p-4">
      <div className="flex">
        <section className="w-full h-auto">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={ChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#424ef5" />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="w-full h-auto"></section>
      </div>
    </main>
  );
}
