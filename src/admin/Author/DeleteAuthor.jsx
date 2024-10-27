// import React from 'react';
import { useFetchAuthors } from '../components/Tanstack';
import GenericDelete from '../components/GenericDelete';
import { deleteAuthors } from '../../utils/http';

export default function DeleteAuthor() {
  const { authorsData, isAuthorsError, isAuthorsPending } = useFetchAuthors();

  return (
    <div>
      <GenericDelete
        QueryKey="authors"
        isError={isAuthorsError}
        isLoading={isAuthorsPending}
        label="Authors"
        mutateFn={deleteAuthors}
        isData={authorsData}
      />
    </div>
  );
}
