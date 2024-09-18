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
import { IMAGES } from '../components/DOCS';
import HighlyAccessed from '../components/homeComponents/HighlyAccessed';
import { BLOGS } from '../components/homeComponents/DUMMY_FILES';

export default function Home() {
  return (
    <>
      <Header
        btnText={'find out more'}
        headText={'This is just a sample'}
        logoText={'important factor 2023'}
      />
      <Search />
      {/* rendering articles */}
      <div className="flex p-4 gap-6 overflow-hidden flex-col md:flex-row items-start justify-center text-slate-700">
        <section className="md:max-w-[22.5rem] w-full flex flex-col gap-3">
          <AccessJournals />
          <HighlyAccessed />
        </section>
        <section className="md:max-w-[43rem] w-full flex flex-col">
          <Carousel images={IMAGES} />
          <RecentArticles />
        </section>
        <section className="md:max-w-[22.5rem] w-full flex flex-col gap-3">
          <News />
          <BlogPosts title={'Blog Posts'} blogs={BLOGS} />
          <Topics />
          <Special />
          <SelectedCollectios />
        </section>
      </div>
      {/* journals by subject */}
      <div className="p-4 mt-[-15px]">
        <JournalsBySubject />
      </div>
    </>
  );
}
