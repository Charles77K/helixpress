import { Search } from '../components/homeComponents';
import Share from '../components/Share';
import PropTypes from 'prop-types';

const DoubleGridLayout = ({ title, children, link, line }) => {
  return (
    <div>
      <Search />
      <div className="p-2 md:p-4 w-full bg-gray-100 flex flex-col md:flex-row items-start justify-center md:gap-10">
        {/* Announcements */}
        <div className="w-full md:w-[65%] bg-white p-6">
          <h1 className="text-slate-800 font-semibold text-xl md:text-3xl mb-6">
            {title}
          </h1>
          <div className="my-3 w-full">
            {line && <hr />}
            <>{children}</>
          </div>
        </div>
        {/* Share Section */}
        <div className="bg-white p-6 hidden md:block">
          <Share linkToShare={link} />
        </div>
      </div>
    </div>
  );
};

export default DoubleGridLayout;

DoubleGridLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  link: PropTypes.string,
  line: PropTypes.bool,
};
