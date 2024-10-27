// import React from 'react';
import { useFetchAbouts } from '../components/Tanstack';
import GenericEdit from './../components/GenericEdit';
import { editAbout } from '../../utils/http';

export default function EditAbout() {
  const { aboutData, isAboutError, isAboutPending } = useFetchAbouts();
  return (
    <div>
      <GenericEdit
        QueryKey="about"
        isError={isAboutError}
        isLoading={isAboutPending}
        label="About"
        mutateFn={editAbout}
        name="about"
        isData={aboutData}
      />
    </div>
  );
}
