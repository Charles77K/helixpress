import { createOpenAccess } from '../../utils/http';
import GenericCreate from '../components/GenericCreate';

export default function CreateOpenAccess() {
  return (
    <div>
      <GenericCreate
        QueryKey="open-access"
        createFn={createOpenAccess}
        label="Open-Access"
        name="open-access"
      />
    </div>
  );
}
