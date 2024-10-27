import { useFetchOpenAccess } from '../components/Tanstack';
import GenericDelete from '../components/GenericDelete';
import { deleteOpenAccess } from '../../utils/http';

export default function DeleteOpenAccess() {
  const { openAccessData, isOpenAccessError, isOpenAccessLoading } =
    useFetchOpenAccess();
  return (
    <div>
      <GenericDelete
        QueryKey="open-access"
        isError={isOpenAccessError}
        isLoading={isOpenAccessLoading}
        label="Open-Access"
        mutateFn={deleteOpenAccess}
        isData={openAccessData}
      />
    </div>
  );
}
