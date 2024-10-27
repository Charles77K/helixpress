// import React from 'react';
import GenericView from './../components/GenericView';
import { useFetchAbouts } from '../components/Tanstack';

export default function ViewAbouts() {
  const { aboutData, isAboutError, isAboutPending } = useFetchAbouts();
  return (
    <div>
      <GenericView
        genericData={aboutData}
        genericDataError={isAboutError}
        genericDataLoading={isAboutPending}
        label={'About'}
      />
    </div>
  );
}
