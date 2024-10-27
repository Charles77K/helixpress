import { useEffect, useRef, useState } from 'react';
import {
  Button,
  FileInput,
  FormInput,
  SelectInput,
} from '../components/Inputs';
import { useMutation } from '@tanstack/react-query';
import { editContact, queryClient } from '../../utils/http'; // Adjust the import path
import { toast } from 'react-toastify';
import SelectComponent from '../components/SelectComponent';
import { useFetchContacts } from '../components/Tanstack'; // Custom hook for fetching contacts

export default function EditContact() {
  const [selectedContact, setSelectedContact] = useState(null); // Set to `null` initially
  const imageRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    pic: '', // Initially, pic is empty
  });

  // Fetch contacts
  const { contactsData, isContactError, isContactPending } = useFetchContacts();

  useEffect(() => {
    if (selectedContact) {
      // Prefill the form with the selected contact data
      setFormData({
        title: selectedContact.title || '',
        content: selectedContact.content || '',
        pic: selectedContact.pic || '', // Prefill with the image URL from the API
      });
    }
  }, [selectedContact]);

  // Mutation for editing a contact
  const { mutate, isPending } = useMutation({
    mutationFn: editContact, // API call
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact updated successfully', { autoClose: 2000 });
      setFormData({ title: '', content: '', pic: '' });
      setSelectedContact(null);
      if (imageRef.current) imageRef.current.value = ''; // Clear the file input
    },
    onError: () => {
      toast.error('Failed to update contact');
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append('title', formData.title);
    newForm.append('content', formData.content);

    // Append pic (file or blob) to FormData
    if (formData.pic) {
      newForm.append('pic', formData.pic);
    }

    console.log(formData); // Debugging purposes

    mutate({ contactData: newForm, contactId: selectedContact.id }); // Send data with the selected contact's ID
  };

  // Handle input changes for text and file inputs
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Override the pic field with the new file
        setFormData((prevData) => ({ ...prevData, pic: file }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle contact selection from dropdown
  const handleSelectChange = (e) => {
    const contactId = e.target.value;
    const contact = contactsData.find((contact) => contact.id == contactId);
    setSelectedContact(contact);
    if (imageRef) imageRef.current.value = '';
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-slate-800 font-bold text-2xl mb-4">Edit Contact</h2>
      {/* Select component to choose a contact */}
      <SelectComponent
        label="Contact"
        name="contact"
        options={contactsData}
        isError={isContactError}
        isLoading={isContactPending}
        onChange={handleSelectChange}
        value={selectedContact ? selectedContact.id : ''}
        optionMain={(contact) => contact.title}
        optionValue={(contact) => contact.id}
      />

      {/* Form fields for editing the contact */}
      {selectedContact && (
        <>
          <FormInput
            name="title"
            type="text"
            label="Title"
            placeholder="Enter title"
            onChange={handleChange}
            value={formData.title}
          />
          <SelectInput
            name="content"
            label="Content"
            rows="4"
            placeholder="Enter content"
            onChange={handleChange}
            value={formData.content}
          />

          {/* Display the existing image from the API if no new image is selected */}
          {formData.pic && (
            <div className="mb-4">
              {formData.pic instanceof File ? (
                <>
                  <img
                    src={URL.createObjectURL(formData.pic)}
                    alt="Selected Pic"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <span className="text-sm">New Image Preview</span>
                </>
              ) : (
                <>
                  <img
                    src={`https://ogbesomto.pythonanywhere.com/${formData.pic}`}
                    alt="Current Pic"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <span className="text-sm">Current Image</span>
                </>
              )}
            </div>
          )}

          {/* File input for uploading a new image */}
          <div>
            <FileInput
              ref={imageRef}
              chooseStyle="mb-0.5"
              name="pic"
              label="Picture"
              onChange={handleChange}
              type="file"
              accept="image/*"
            />
            <span className="text-xs">
              NB: leave this field empty if you dont want to change the image
            </span>
          </div>

          {/* Submit button */}
          <Button disabled={isPending ? true : false}>
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </>
      )}
    </form>
  );
}
