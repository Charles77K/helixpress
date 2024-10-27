import GenericEdit from '../components/GenericEdit';
import { editCharges } from '../../utils/http';
import { useFetchCharges } from '../components/Tanstack';

export default function EditCharges() {
  const { chargesData, isChargesError, isChargesLoading } = useFetchCharges();

  return (
    <div>
      <GenericEdit
        QueryKey="charges"
        isError={isChargesError}
        isLoading={isChargesLoading}
        label="Charges"
        mutateFn={editCharges}
        name="charges"
        isData={chargesData}
      />
    </div>
  );
}
