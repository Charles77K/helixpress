import { createEditorialProcess } from '../../utils/http';
import GenericCreate from '../components/GenericCreate';

export default function CreateEditorialProcess() {
  return (
    <div>
      <GenericCreate
        QueryKey="editorial-processes"
        createFn={createEditorialProcess}
        label="Editorial-Process"
        name="editorail-process"
      />
    </div>
  );
}
