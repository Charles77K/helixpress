import { editVisibilityStatement } from '../../utils/http';
import GenericEdit from '../components/GenericEdit';
import { useFetchVisibilityStatements } from '../components/Tanstack';

export default function EditVisiblityStatement() {
  const {
    visibilityStatementsData,
    isVisibilityStatementsError,
    isVisibilityStatementsLoading,
  } = useFetchVisibilityStatements();
  return (
    <div>
      <GenericEdit
        QueryKey="visibility-statements"
        isError={isVisibilityStatementsError}
        isLoading={isVisibilityStatementsLoading}
        label="Visbility-Statement"
        mutateFn={editVisibilityStatement}
        name="visiblity-statement"
        isData={visibilityStatementsData}
      />
    </div>
  );
}
