import { useFetchCharges } from '../components/Tanstack';
import GenericDelete from '../components/GenericDelete';
import { deleteCharges } from '../../utils/http';

export default function DeleteCharges() {
  const { chargesData, isChargesError, isChargesLoading } = useFetchCharges();

  return (
    <div>
      <GenericDelete
        QueryKey="charges"
        isError={isChargesError}
        isLoading={isChargesLoading}
        label="Charges"
        mutateFn={deleteCharges}
        isData={chargesData}
      />
    </div>
  );
}
