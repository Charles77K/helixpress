import {
  Header,
  AccessJournals,
  RecentArticles,
  News,
  BlogPosts,
  Search,
  Topics,
  Special,
  SelectedCollectios,
  JournalsBySubject,
} from '../components/homeComponents';
import Carousel from '../components/Carousel';
// import { IMAGES } from '../components/DOCS';
import HighlyAccessed from '../components/homeComponents/HighlyAccessed';
import { BLOGS } from '../components/homeComponents/DUMMY_FILES';

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Header
        btnText={'find out more'}
        headText={'This is just a sample'}
        logoText={'important factor 2023'}
      />
      <Search />
      {/* rendering articles */}
      <div className="flex p-4 gap-7 flex-col md:flex-row items-start justify-center text-slate-700">
        {/* First section */}
        <section className="flex-grow md:flex-grow-[1] md:basis-1/4 min-w-[10rem] w-full flex flex-col gap-3">
          <AccessJournals />
          <HighlyAccessed />
        </section>
        {/* Middle section (wider than the others) */}
        <section className="flex-grow md:flex-grow-[2] md:basis-1/2 min-w-[20rem] w-full flex flex-col">
          <Carousel />
          <RecentArticles />
        </section>
        {/* Last section */}
        <section className="flex-grow md:flex-grow-[1] md:basis-1/4 min-w-[10rem] w-full flex flex-col gap-3">
          <News />
          <BlogPosts title={'Blog Posts'} blogs={BLOGS} />
          <Topics />
          <Special />
          <SelectedCollectios />
        </section>
      </div>
      {/* journals by subject */}
      <div className="p-4">
        <JournalsBySubject />
      </div>
    </div>
  );
}
