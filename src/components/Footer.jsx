import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCreate, useFetch } from '../services/hooks';
import { Input, SelectInput } from '../UI';
import { toast } from 'react-toastify';
import Spinner from '../UI/Spinner';

const initialState = {
  journal: '',
  email: '',
};

const Footer = () => {
  const [formData, setFormData] = useState(initialState);
  const { data, isPending } = useFetch('/journals/');
  const { mutate, isPending: isSending } = useCreate('/newsletters/');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        toast.success('Successfully subscribed', {
          autoClose: 2000,
        });
        setFormData(initialState);
      },
      onError: (error) => {
        toast.error(`${error || 'An unexpected error occurred'}`);
      },
    });
  };

  const containerStyle = 'flex flex-col items-start gap-2';

  return (
    <div>
      <div className="bg-[#52527a] text-white px-2 md:px-8 py-2 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-8">
          <section className={'flex flex-col items-start'}>
            <img src="/helixFooter.png" className="w-36 h-10 md:h-10 md:w-40" />
            <h4 className="text-sm text-white max-w-[18rem]">
              Subscribe to receive issue release notifications and newsletters
              from Helixpress journals
            </h4>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <SelectInput
                value={formData.journal}
                onChange={handleChange}
                name={'journal'}
                placeholder={'All Journals'}
                optionLabel={'name'}
                optionValue={'id'}
                options={data}
                isLoading={isPending}
              />
              <Input
                value={formData.email}
                onChange={handleChange}
                type="email"
                className={'w-full'}
                name={'email'}
                placeholder={'Your email address'}
              />
              <button
                type="submit"
                disabled={isPending}
                className="bg-[#404040] px-3 py-2 text-sm text-white rounded-md disabled:cursor-not-allowed"
              >
                {isSending ? <Spinner /> : 'Subscribe'}
              </button>
            </form>
          </section>

          {/* further information */}
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
              Contact Helixpress
            </Link>
            <Link className="text-xs font-bold hover:underline">
              Jobs at Helixpress
            </Link>
          </section>

          {/* Guidelines */}
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

          {/* Initiatives */}
          <section className={containerStyle}>
            <h2 className="font-bold">Helixpress Initiatives</h2>
            <Link className="text-xs font-bold hover:underline">Sciforum</Link>
            <Link className="text-xs font-bold hover:underline">
              Helixpress Books
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

          {/* Our socials */}
          <section className={containerStyle}>
            <h2 className="font-bold">Follow Helixpress</h2>
            <Link className="text-xs font-bold hover:underline">LinkedIn</Link>
            <Link className="text-xs font-bold hover:underline">Facebook</Link>
            <Link className="text-xs font-bold hover:underline">Twitter</Link>
          </section>
        </div>
      </div>

      {/* <div className="bg-[#404040] flex justify-between px-7 py-5 flex-wrap gap-5">
        <p className="text-xs text-white">
          © 1996-2024 Helixpress (Basel, Switzerland) unless otherwise stated
        </p>
        <section className="flex gap-5 text-white text-[10px] md:text-xs">
          <Link className="font-bold hover:underline">Disclaimer</Link>
          <Link className="font-bold hover:underline">
            Terms and Conditions
          </Link>
          <Link className="font-bold hover:underline">Privacy Policy</Link>
        </section>
      </div> */}
    </div>
  );
};

export default Footer;
