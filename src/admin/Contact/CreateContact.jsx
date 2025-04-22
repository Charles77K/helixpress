// import { useRef, useState } from 'react';
// import { useMutation } from '@tanstack/react-query';
// import { toast } from 'react-toastify';
// import { createContact, queryClient } from '../../utils/http'; // Adjust your import path
// import {
//   Button,
//   FormInput,
//   SelectInput,
//   FileInput,
// } from '../components/Inputs'; // Assuming you have custom input components

// export default function CreateContact() {
//   const imageRef = useRef(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     pic: null,
//   });

//   const { mutate, isPending } = useMutation({
//     mutationFn: (contactData) => createContact(contactData), // Assuming createContact sends data to your API
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ['contacts'],
//       });
//       toast.success('Contact created successfully', {
//         autoClose: 2000,
//       });
//       setFormData({
//         title: '',
//         content: '',
//         pic: null,
//       });
//       if (imageRef) imageRef.current.value = '';
//     },
//     onError: (error) => {
//       toast.error('Failed to create contact');
//       console.log(error);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const contactData = new FormData();
//     Object.keys(formData).forEach((key) =>
//       contactData.append(key, formData[key])
//     );
//     // contactData.append('title', formData.title);
//     // contactData.append('content', formData.content);
//     // if (formData.pic) {
//     //   contactData.append('pic', formData.pic);
//     // }

//     // Logging keys and values
//     for (const [key, value] of contactData.entries()) {
//       console.log(`${key}: ${value}`);
//     }

//     mutate(contactData);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       pic: file,
//     }));
//   };

//   return (
//     <form className="p-4" onSubmit={handleSubmit}>
//       <h2 className="text-slate-800 font-bold text-2xl mb-4">Create Contact</h2>
//       <FormInput
//         name="title"
//         label="Title"
//         placeholder={'Enter title'}
//         onChange={handleChange}
//         type="text"
//         value={formData.title}
//       />
//       <SelectInput
//         name="content"
//         label="Content"
//         rows="4"
//         placeholder={'Enter content'}
//         onChange={handleChange}
//         value={formData.content}
//       />
//       <FileInput
//         name="pic"
//         label="Picture"
//         onChange={handleImageChange}
//         accept="image/*"
//         ref={imageRef}
//       />
//       <Button disabled={isPending ? true : false}>
//         {isPending ? 'Submitting...' : 'Submit'}
//       </Button>
//     </form>
//   );
// }
