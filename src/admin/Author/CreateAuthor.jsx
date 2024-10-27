// import React from 'react';
import GenericCreate from '../components/GenericCreate';
import { createAuthors } from '../../utils/http';

export default function CreateAuthor() {
  return (
    <div>
      <GenericCreate
        QueryKey="authors"
        createFn={createAuthors}
        label="Authors"
        name="author"
      />
    </div>
  );
}
