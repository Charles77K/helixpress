// import React from "react";
import { OFFICES } from '../components/DOCS';
import { Search } from '../components/homeComponents';

import { FaLocationDot } from 'react-icons/fa6';

export default function Contact() {
  return (
    <div className="mb-8">
      <Search />
      <div className="flex p-6 md:px-20 md:py-10 gap-2 overflow-hidden flex-col items-start justify-center mx-auto text-slate-700  max-w-[60rem] bg-white mt-8">
        <section>
          <h1 className="text-3xl font-bold my-5 text-slate-700">Contact</h1>
          <h1 className="text-xl font-bold text-slate-700">Contact Us</h1>
          <div className="text-xs space-y-4 mt-3">
            <p>For all enquiries, please use the Contact Form.</p>
          </div>
        </section>
        <section>
          <h1 className="text-xl font-bold my-5 text-slate-700">
            Office Locations
          </h1>
          <h1 className="text-xl font-bold text-slate-700">
            MDPI Headquarters
          </h1>
          <div className="text-xs space-y-4 mt-3">
            <ul className="flex items-center gap-3">
              <li className="h-40 w-[1px] bg-slate-300"></li>
              <li className="text-xs">
                <p className="flex items-center gap-2">
                  <span className="text-sm">{OFFICES[0].room}</span>
                  <span>
                    <FaLocationDot size={13} />
                  </span>
                </p>
                <p>{OFFICES[0].addressLine1}</p>
                <p>{OFFICES[0].addressLine2}</p>
                <p className="mb-2">{OFFICES[0].phone}</p>
                <p>Office Hours: {OFFICES[0].officeHours}</p>
                <p className="font-semibold mb-2">
                  {OFFICES[0].publicHolidays}
                </p>
                <p className="w-60">History: {OFFICES[0].history}</p>
              </li>
            </ul>
          </div>
        </section>
        {/* blehhh */}
        <section className="my-4">
          <h1 className="text-xl font-bold text-slate-700">Europe</h1>
          <div className="text-xs space-y-4 mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {OFFICES.map((item, index) => (
              <ul key={index} className="flex items-center gap-3">
                <li className="h-40 w-[1px] bg-slate-300"></li>
                <li className="text-xs">
                  <p className="flex items-center gap-2">
                    <span className="text-sm">{item.room}</span>
                    <span>
                      <FaLocationDot size={13} />
                    </span>
                  </p>
                  <p>{item.addressLine1}</p>
                  <p>{item.addressLine2}</p>
                  <p className="mb-2">{item.phone}</p>
                  <p>Office Hours: {item.officeHours}</p>
                  <p className="font-semibold mb-2">{item.publicHolidays}</p>
                  <p className="w-60">History: {item.history}</p>
                </li>
              </ul>
            ))}
          </div>
        </section>
        {/* bleh */}
        <section className="my-4">
          <h1 className="text-xl font-bold text-slate-700">Asia</h1>
          <div className="text-xs space-y-4 mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {OFFICES.map((item, index) => (
              <ul key={index} className="flex items-center gap-3">
                <li className="h-40 w-[1px] bg-slate-300"></li>
                <li className="text-xs">
                  <p className="flex items-center gap-2">
                    <span className="text-sm">{item.room}</span>
                    <span>
                      <FaLocationDot size={13} />
                    </span>
                  </p>
                  <p>{item.addressLine1}</p>
                  <p>{item.addressLine2}</p>
                  <p className="mb-2">{item.phone}</p>
                  <p>Office Hours: {item.officeHours}</p>
                  <p className="font-semibold mb-2">{item.publicHolidays}</p>
                  <p className="w-60">History: {item.history}</p>
                </li>
              </ul>
            ))}
          </div>
        </section>
        {/* bleh */}
      </div>
    </div>
  );
}
