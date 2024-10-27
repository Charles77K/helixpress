// import React from 'react';
import GenericCreate from '../components/GenericCreate';
import { createCharges } from '../../utils/http';

export default function CreateCharges() {
  return (
    <div>
      <GenericCreate
        QueryKey="charges"
        createFn={createCharges}
        label="Charges"
        name="charges"
      />
    </div>
  );
}
