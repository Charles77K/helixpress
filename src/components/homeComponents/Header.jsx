import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ headText, subText, btnText }) {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-600 min-h-[320px] w-full flex justify-between px-8 py-12 items-center">
      <section className="flex gap-3 flex-col items-start max-w-xl">
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
          {headText}
        </h1>
        {subText && <p className="text-blue-100 text-base">{subText}</p>}
        <Link to={'/submission'}>
          <button className="border-none w-auto px-6 py-3 rounded-full bg-white text-slate-800 hover:bg-slate-800 hover:text-white font-medium transition-all duration-300 shadow-lg">
            {btnText}
          </button>
        </Link>
      </section>
      {/* <section className="h-48 w-48 rounded-full bg-yellow-300 hidden md:flex justify-center items-center shadow-xl">
        <h2 className="text-center text-2xl font-bold text-blue-800">
          {logoText}
        </h2>
      </section> */}
    </div>
  );
}

Header.propTypes = {
  headText: PropTypes.string.isRequired,
  subText: PropTypes.string,
  btnText: PropTypes.string.isRequired,
  logoText: PropTypes.string,
};
