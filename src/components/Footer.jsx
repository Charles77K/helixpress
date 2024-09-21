import { useState } from 'react';
import { SelectInput } from './homeComponents/Search';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [journal, setJournal] = useState('');
  const [email, setEmail] = useState('');

  const journalOptions = [
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'maths', label: 'Maths' },
    { value: 'physics', label: 'Physics' },
  ];

  const handleChange = (e) => {
    setJournal(e.target.value);
  };

  const inputStyle =
    'my-3 w-60 border-slate-800 text-[12px] text-slate-800 border-solid border border-slate-400 placeholder:placeholder-custom-gray placeholder:text-[12px] px-4 py-1 rounded-md items-center focus:outline-none';

  const containerStyle = 'flex flex-col items-start gap-2';

  return (
    <div>
      <div className="bg-[#52527a] text-white px-2 md:px-8 py-2 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-8">
          <section className={'flex flex-col items-start'}>
            <img
              src="../../public/mdpi.svg"
              className="w-10 h-10 md:h-14 md:w-14"
            />
            <h4 className="text-sm text-white max-w-[18rem]">
              Subscribe to receive issue release notifications and newsletters
              from MDPI journals
            </h4>
            <SelectInput
              value={journal}
              onChange={handleChange}
              placeholder={'All Journals'}
              options={journalOptions}
              className={inputStyle}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder={'Your email address'}
              className={inputStyle}
            />
            <button className="bg-[#404040] px-3 py-2 text-sm text-white rounded-md">
              Subscribe
            </button>
          </section>
          <section className={containerStyle}>
            <h2 className="font-bold">Further Information</h2>
            <Link className="text-xs font-bold hover:underline">
              Article Processing Charges
            </Link>
            <Link className="text-xs font-bold hover:underline">
              Pay an invoice
            </Link>
            <Link className="text-xs font-bold hover:underline">
              Open Access Policy
            </Link>
            <Link className="text-xs font-bold hover:underline">
              Contact MDPI
            </Link>
            <Link className="text-xs font-bold hover:underline">
              Jobs at MDPI
            </Link>
          </section>
          <section className={containerStyle}>
            <h2 className="font-bold">Guidelines</h2>
            <Link className="text-xs font-bold hover:underline">
              For Authors
            </Link>
            <Link className="text-xs font-bold hover:underline">
              For Reviewers
            </Link>
            <Link className="text-xs font-bold hover:underline">
              For Editors
            </Link>
            <Link className="text-xs font-bold hover:underline">
              For Librarians
            </Link>
            <Link className="text-xs font-bold hover:underline">
              For Societies
            </Link>
            <Link className="text-xs font-bold hover:underline">
              For Conference Organizers
            </Link>
          </section>
          <section className={containerStyle}>
            <h2 className="font-bold">MDPI Initiatives</h2>
            <Link className="text-xs font-bold hover:underline">Sciforum</Link>
            <Link className="text-xs font-bold hover:underline">
              MDPI Books
            </Link>
            <Link className="text-xs font-bold hover:underline">
              Preprints.org
            </Link>
            <Link className="text-xs font-bold hover:underline">Scilit</Link>
            <Link className="text-xs font-bold hover:underline">
              SciProfiles
            </Link>
            <Link className="text-xs font-bold hover:underline">
              Encyclopedia
            </Link>
            <Link className="text-xs font-bold hover:underline">JAMS</Link>
            <Link className="text-xs font-bold hover:underline">
              Proceeding Series
            </Link>
          </section>
          <section className={containerStyle}>
            <h2 className="font-bold">Follow MDPI</h2>
            <Link className="text-xs font-bold hover:underline">LinkedIn</Link>
            <Link className="text-xs font-bold hover:underline">Facebook</Link>
            <Link className="text-xs font-bold hover:underline">Twitter</Link>
          </section>
        </div>
      </div>
      <div className="bg-[#404040] flex justify-between px-7 py-5 flex-wrap gap-5">
        <p className="text-xs text-white">
          © 1996-2024 MDPI (Basel, Switzerland) unless otherwise stated
        </p>
        <section className="flex gap-5 text-white text-[10px] md:text-xs">
          <Link className="font-bold hover:underline">Disclaimer</Link>
          <Link className="font-bold hover:underline">
            Terms and Conditions
          </Link>
          <Link className="font-bold hover:underline">Privacy Policy</Link>
        </section>
      </div>
    </div>
  );
};

export default Footer;
