// import React from 'react'
import GenericCRUD from '../components/GenericCRUD';
import { deleteVolume, getJournals, getVolumes } from '../../utils/http';

export default function DeleteVolume() {
  return (
    <GenericCRUD
      deleteItem={deleteVolume}
      getItems={getVolumes}
      getJournals={getJournals}
      entityLabel={'volumes'}
    />
  );
}
