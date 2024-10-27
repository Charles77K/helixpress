import { editOpenAccess } from '../../utils/http';
import GenericEdit from '../components/GenericEdit';
import { useFetchOpenAccess } from '../components/Tanstack';

export default function EditOpenAccess() {
  const { openAccessData, isOpenAccessError, isOpenAccessLoading } =
    useFetchOpenAccess();
  return (
    <div>
      <GenericEdit
        QueryKey="open-access"
        isError={isOpenAccessError}
        isLoading={isOpenAccessLoading}
        label="Open-Access"
        mutateFn={editOpenAccess}
        name="open-access"
        isData={openAccessData}
      />
    </div>
  );
}
