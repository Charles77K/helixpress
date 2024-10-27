import { useFetchEditorialProcesses } from '../components/Tanstack';
import GenericDelete from '../components/GenericDelete';
import { deleteEditorialProcess } from '../../utils/http';

export default function DeleteEditorialProcess() {
  const {
    editorialProcessesData,
    isEditorialProcessesError,
    isEditorialProcessesLoading,
  } = useFetchEditorialProcesses();
  return (
    <div>
      <GenericDelete
        QueryKey="editorial-processes"
        isError={isEditorialProcessesError}
        isLoading={isEditorialProcessesLoading}
        label="Editorial-Process"
        mutateFn={deleteEditorialProcess}
        isData={editorialProcessesData}
      />
    </div>
  );
}
