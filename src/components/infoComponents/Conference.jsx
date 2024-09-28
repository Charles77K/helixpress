export function List({ title }) {
  return <li className="list-disc leading-5 ml-3.5">{title}</li>;
}

export default function Conference() {
  const listItems = [
    'Understand the frontiers of the field',
    'Share research results',
    'Inspire scientific research ideas',
    'Review their own research progress and improve academic perception',
  ];

  return (
    <div className="bg-white p-8 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-slate-800">
        Information for Conference Organizers
      </h1>
      <div>
        <h1 className="text-xl font-bold text-slate-800">Overview</h1>
        <div className="text-xs space-y-4 mt-3">
          <p>
            An academic conference is an important channel for promoting
            scientific development and academic exchange. It could help scholars
            to:
          </p>
          <ul className="text-xs text-black">
            {listItems.map((item, index) => (
              <List key={index} title={item} />
            ))}
          </ul>
          <p>
            To support scientific exchange in all forms, across all disciplines,
            MDPI would like to offer conference organizers services including
            conference organization, paper publication, and sponsorship support.
          </p>
        </div>
      </div>
      {/* 2 */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Organize Your Event with Sciforum
        </h1>
        <div className="text-xs space-y-4 mt-3">
          <h1 className="text-sm font-semibold">
            Website and Program Management
          </h1>
          <p>
            Sciforum provides online tools that support all aspects of event
            organization, including setting up and maintaining the event
            website, managing the peer-review process, handling and coordinating
            the event schedule, registration, billing, sponsors, etc.
          </p>
          <h1 className="text-sm font-semibold">Customized Event Services</h1>
          <p>
            In addition to offering access to the Sciforum tools, we offer
            personalized support to meet your specific needs, including
            management of registration, graphic design, live streaming support,
            and support with administrative tasks and financial accounting.
          </p>
          <p>
            To know more about our services and submit a proposal, click here.
          </p>
          <p>
            For any questions regarding Sciforum, you may contact
            info@sciforum.net.
          </p>
        </div>
      </div>
      {/* 3 */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Publication Opportunities
        </h1>
        <div className="text-xs space-y-3 mt-3">
          <h1 className="text-sm text-slate-800 hover:cursor-pointer hover:underline">
            Proceeding Series
          </h1>
          <p>
            MDPI publishes a series of open access conference journals in all
            research fields, including Biology & Life Sciences, Business &
            Economics, Chemistry & Materials Science, Computer Science &
            Mathematics, Engineering, Environmental & Earth Sciences, Medicine &
            Pharmacology, Physical Sciences, Public Health & Healthcare, Social
            Sciences, Arts and Humanities, etc. These journals provide a
            high-quality service and are dedicated to making the output of
            conferences widely available.
          </p>
          <p>If you are interested, please fill in the proposal here.</p>
          <p>For any questions, you may contact proceedings-series@mdpi.com.</p>
          <h1 className="text-sm font-bold">Special Issue</h1>
          <p>
            We can also set up a Special Issue to publish full research papers
            based on their presentation at the conference in a relevant journal.
            The editorial office will take care of the technical aspects of the
            editorial process. The Guest Editors designated by the conference
            will be responsible for inviting attendees to contribute and making
            final decisions based on the review reports we collect.
          </p>
          <p>If you are interested, please contact sponsorship-si@mdpi.com.</p>
          <h1 className="text-sm text-slate-800 hover:cursor-pointer hover:underline">
            Topics
          </h1>
          <p>
            We can collaborate with the conference to set up a topic, which is a
            collection of papers that concentrate on specific interdisciplinary
            topics in two or more related MDPI journals. Topics allow authors
            from different research areas to unite around one theme, describe
            multi-disciplinary applications, and develop new ideas.
          </p>
          <p>
            The editorial office will take care of the technical aspects of the
            editorial process. The Topic Editors designated by the conference
            will be responsible for inviting attendees to contribute and making
            final decisions based on the review reports that we collect.
          </p>
          <p>If you are interested, please contact topics@mdpi.com.</p>
          <h1 className="text-sm text-slate-800 hover:cursor-pointer hover:underline">
            Open Access Books
          </h1>
          <p>
            MDPI Books publishes research in open access (OA) book format,
            unhindered by paywalls, resulting in high visibility and increased
            citations. Anyone with access to an internet connection can read the
            publications in our Library. Whether its a conference report,
            monograph, or edited book, publishing your conference findings in a
            book provides a lasting reference for researchers, students, and
            professionals.
          </p>
          <p>
            We understand that each conference has its unique objectives and
            areas of focus, which is why we publish books in a variety of
            different fields. Our dedicated team provides personalized support
            throughout the publication process, from manuscript preparation to
            peer review coordination (where required), English editing,
            typesetting, conversion, and design.
          </p>
          <p>
            If you are interested in discussing a project or receiving a quote,
            please review our guidelines and submit a proposal here. For
            inquiries or personalized assistance, reach out to our Books team at
            books@mdpi.com.
          </p>
        </div>
      </div>
      {/* 4 */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Sponsorship Support
        </h1>
        <div className="text-xs space-y-4 mt-3">
          <p>
            MDPI cooperates with hundreds of academic conferences each year.
            Besides the above services, we can also provide various types of
            sponsorship support, such as conference advertisements on journal
            homepages, awards, keynote speeches, booths, etc.
          </p>
          <p>If you are interested, please contact sponsorship@mdpi.com.</p>
        </div>
      </div>
    </div>
  );
}
