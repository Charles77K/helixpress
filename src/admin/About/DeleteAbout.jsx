// import React from 'react';
import { useFetchAbouts } from '../components/Tanstack';
import GenericDelete from './../components/GenericDelete';
import { deleteAbout } from '../../utils/http';

export default function DeleteAbout() {
  const { aboutData, isAboutError, isAboutPending } = useFetchAbouts();
  return (
    <div>
      <GenericDelete
        QueryKey="about"
        isError={isAboutError}
        isLoading={isAboutPending}
        label="About"
        mutateFn={deleteAbout}
        isData={aboutData}
      />
    </div>
  );
}
