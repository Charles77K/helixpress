import GenericView from '../components/GenericView';
import { useFetchEditorialProcesses } from '../components/Tanstack';

export default function ViewEditorialProcess() {
  const {
    editorialProcessesData,
    isEditorialProcessesError,
    isEditorialProcessesLoading,
  } = useFetchEditorialProcesses();
  return (
    <div>
      <GenericView
        genericData={editorialProcessesData}
        genericDataError={isEditorialProcessesError}
        genericDataLoading={isEditorialProcessesLoading}
        label={'Editorial-Process'}
      />
    </div>
  );
}
