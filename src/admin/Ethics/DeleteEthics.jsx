import { deleteEthics } from '../../utils/http';
import GenericDelete from '../components/GenericDelete';
import { useFetchEthics } from '../components/Tanstack';

export default function DeleteEthics() {
  const { ethicsData, isEthicsError, isEthicsLoading } = useFetchEthics();

  return (
    <div>
      <GenericDelete
        QueryKey="ethics"
        isError={isEthicsError}
        isLoading={isEthicsLoading}
        label="Ethics"
        mutateFn={deleteEthics}
        isData={ethicsData}
      />
    </div>
  );
}
