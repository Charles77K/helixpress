import { createVisibilityStatement } from '../../utils/http';
import GenericCreate from '../components/GenericCreate';

export default function CreateVisibilityStatement() {
  return (
    <div>
      <GenericCreate
        QueryKey="visibility-statements"
        createFn={createVisibilityStatement}
        label="Visibility-Statement"
        name="visiblity-statement"
      />
    </div>
  );
}
