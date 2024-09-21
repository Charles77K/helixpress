// import React from 'react';
import { SelectInput } from '../homeComponents/Search';
import { inputClass } from '../../pages/Journals';

const ASIDE = {
  current: [
    { value: 'subscription', label: 'Subscription' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'openAccess', label: 'Open Access' },
  ],
  frequency: [
    { value: 'biannual', label: 'Biannual' },
    { value: 'quarterly', label: 'Quarterly' }, // Fixed spelling of 'Quarterly'
    { value: 'monthly', label: 'Monthly' },
    { value: 'other', label: 'Other' },
  ],
};

export default function ExistingJournal({ Changer, formValues }) {
  const spanClass =
    'w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none';
  return (
    <div className="bg-white text-slate-700 flex flex-col gap-5 text-xs">
      <h1 className="font-bold text-xl">Existing Journal Information</h1>
      <p>
        <label>Editor-in-chief</label>
        <span className="relative bottom-1"> req</span>
        <input
          name="existingChief"
          value={formValues.existingChief}
          onChange={Changer}
          type="text"
          className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      <p>
        <label>Journal title</label>
        <textarea
          name="journalTitle"
          value={formValues.journalTitle}
          onChange={Changer}
          type="text"
          placeholder="Please type the journal title"
          className="h-20 w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      <p>
        <label>Aims & scope</label>
        <textarea
          name="aimScope"
          value={formValues.aimScope}
          onChange={Changer}
          type="text"
          placeholder="Please briefly describe the main topic and areas this journal covers"
          className="h-32 w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      {/* website */}
      <p>
        <label>Website</label>
        <span className="relative bottom-1"> req</span>
        <input
          name="website"
          value={formValues.website}
          onChange={Changer}
          type="text"
          className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      {/* ISSN */}
      <p>
        <label>ISSN</label>
        <span className="relative bottom-1"> req</span>
        <input
          name="ISSN"
          value={formValues.ISSN}
          onChange={Changer}
          type="text"
          required
          className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      {/* publisher */}
      <p>
        <label>Current publisher</label>
        <span className="relative bottom-1"> req</span>
        <input
          name="currentPublisher"
          value={formValues.currentPublisher}
          onChange={Changer}
          type="text"
          required
          className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      {/* owner */}
      <p>
        <label>Owner of the journal</label>
        <span className="relative bottom-1"> req</span>
        <input
          name="owner"
          value={formValues.owner}
          onChange={Changer}
          type="text"
          required
          className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      {/* society */}
      <p>
        <label>Affiliated learned society / association (if applicable)</label>
        <input
          name="society"
          value={formValues.society}
          onChange={Changer}
          type="text"
          className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      {/* current */}
      <p>
        <label>Current publishing model</label>
        <span className="relative bottom-1"> req</span>
        <SelectInput
          className={inputClass}
          onChange={Changer}
          options={ASIDE.current}
          //   placeholder={'blahh'}
          value={formValues.publishingModel}
          name={'publishingModel'}
        />
      </p>
      {/* volume */}
      <p>
        <label>Current Volume</label>
        <span className="relative bottom-1"> req</span>
        <input
          name="volume"
          value={formValues.volume}
          onChange={Changer}
          type="text"
          className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      {/* frequncy */}
      <p>
        {' '}
        <label>Publishing frequency</label>
        <span className="relative bottom-1"> req</span>
        <SelectInput
          name={'frequency'}
          className={inputClass}
          onChange={Changer}
          options={ASIDE.frequency}
          //   placeholder={'blehh'}
          value={formValues.frequency}
        />
      </p>
      {/* flexable years section */}
      <p className="grid md:grid-cols-3 gap-4 grid-col-1 items-start md:items-center md:gap-8">
        <span>
          <label>Published items in 2024</label>
          <input
            value={formValues.items2024}
            onChange={Changer}
            required
            type="text"
            name="items2024"
            className={spanClass}
          />
        </span>
        {/* span2 */}
        <span>
          <label>Published items in 2023</label>
          <input
            value={formValues.items2023}
            onChange={Changer}
            required
            type="text"
            name="items2023"
            className={spanClass}
          />
        </span>
        <span>
          <label>Published items in 2022</label>
          <input
            value={formValues.items2022}
            onChange={Changer}
            required
            type="text"
            name="items2022"
            className={spanClass}
          />
        </span>
        <span>
          <label>Published items in 2021</label>
          <input
            value={formValues.items2021}
            onChange={Changer}
            required
            type="text"
            name="items2021"
            className={spanClass}
          />
        </span>
        <span>
          <label>Published items in 2020</label>
          <input
            value={formValues.items2020}
            onChange={Changer}
            required
            type="text"
            name="items2020"
            className={spanClass}
          />
        </span>
      </p>
      {/* other services */}
      <p>
        <label>Other indexing & abstracting services</label>
        <input
          name="services"
          value={formValues.services}
          onChange={Changer}
          type="text"
          className="w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
      <p>
        <label>Any other relevant information</label>
        <textarea
          name="information"
          value={formValues.information}
          onChange={Changer}
          type="text"
          placeholder="Please enter any other relevant information"
          className="h-32 w-full border-gray-300 mt-1 border-[0.5px] rounded-md text-xs p-1.5 text-gray-700 focus:outline-none"
        />
      </p>
    </div>
  );
}
