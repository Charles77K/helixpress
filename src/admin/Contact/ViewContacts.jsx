import { useFetchContacts } from '../components/Tanstack'; // Adjust the import
import Loader from '../../UI/Loader';
import Error from '../../utils/Error';

export default function ViewContacts() {
  const { contactsData, isContactPending, isContactError } = useFetchContacts();

  let content;

  if (isContactPending) {
    content = <Loader />;
  } else if (isContactError) {
    content = <Error title="Error" text="Error fetching contacts" />;
  } else if (contactsData && contactsData.length > 0) {
    content = contactsData.map((contact) => (
      <ul
        key={contact.id}
        className="flex flex-col mb-4 p-4 bg-gray-50 rounded-lg"
      >
        <li className="font-bold text-xs">Title: {contact.title}</li>
        <li className="text-xs leading-5 text-gray-700">
          Content: {contact.content}
        </li>
        {contact.pic && (
          <img
            src={`https://ogbesomto.pythonanywhere.com/${contact.pic}`}
            alt="Contact"
            className="w-16 h-16 object-cover rounded-full mt-2"
          />
        )}
      </ul>
    ));
  } else {
    content = <p>No contacts found</p>;
  }

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-slate-800 font-bold text-2xl mb-4">All Contacts</h2>
      {content}
    </div>
  );
}
