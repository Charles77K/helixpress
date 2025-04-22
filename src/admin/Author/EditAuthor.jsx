// // import React from 'react';
// import GenericEdit from '../components/GenericEdit';
// import { useFetchAuthors } from '../components/Tanstack';
// import { editAuthors } from '../../utils/http';

// export default function EditAuthor() {
//   const { authorsData, isAuthorsError, isAuthorsPending } = useFetchAuthors();

//   return (
//     <div>
//       <GenericEdit
//         QueryKey="authors"
//         isError={isAuthorsError}
//         isLoading={isAuthorsPending}
//         label="Authors"
//         mutateFn={editAuthors}
//         name="author"
//         isData={authorsData}
//       />
//     </div>
//   );
// }
