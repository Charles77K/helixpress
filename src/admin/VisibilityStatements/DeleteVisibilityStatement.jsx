import { deleteVisibilityStatement } from '../../utils/http';
import GenericDelete from '../components/GenericDelete';
import { useFetchVisibilityStatements } from '../components/Tanstack';

export default function DeleteVisibilityStatement() {
  const {
    visibilityStatementsData,
    isVisibilityStatementsError,
    isVisibilityStatementsLoading,
  } = useFetchVisibilityStatements();
  return (
    <div>
      <GenericDelete
        QueryKey="visibility-statements"
        isError={isVisibilityStatementsError}
        isLoading={isVisibilityStatementsLoading}
        label="Visibility-Statemtent"
        mutateFn={deleteVisibilityStatement}
        isData={visibilityStatementsData}
      />
    </div>
  );
}
