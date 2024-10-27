import GenericView from '../components/GenericView';
import { useFetchVisibilityStatements } from '../components/Tanstack';

export default function ViewVisibilityStatement() {
  const {
    visibilityStatementsData,
    isVisibilityStatementsError,
    isVisibilityStatementsLoading,
  } = useFetchVisibilityStatements();
  return (
    <div>
      <GenericView
        genericData={visibilityStatementsData}
        genericDataError={isVisibilityStatementsError}
        genericDataLoading={isVisibilityStatementsLoading}
        label={'Visiblity-Statements'}
      />
    </div>
  );
}
