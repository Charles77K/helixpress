import { deleteEditors } from '../../utils/http';
import GenericDelete from '../components/GenericDelete';
import { useFetchEditors } from '../components/Tanstack';

export default function DeleteEditor() {
  const { editorsData, isEditorsError, isEditorsLoading } = useFetchEditors();

  return (
    <div>
      <GenericDelete
        QueryKey="editors"
        isError={isEditorsError}
        isLoading={isEditorsLoading}
        label="Editors"
        mutateFn={deleteEditors}
        isData={editorsData}
      />
    </div>
  );
}
