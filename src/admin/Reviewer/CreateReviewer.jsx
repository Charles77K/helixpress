import { createReviewers } from '../../utils/http';
import GenericCreate from '../components/GenericCreate';

export default function CreateReviewer() {
  return (
    <div>
      <GenericCreate
        QueryKey="reviewers"
        createFn={createReviewers}
        label="Reviewer"
        name="reviewers"
      />
    </div>
  );
}
