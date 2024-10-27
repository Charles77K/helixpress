import { editReviewers } from '../../utils/http';
import GenericEdit from '../components/GenericEdit';
import { useFetchReviewers } from '../components/Tanstack';

export default function EditReviewer() {
  const { reviewersData, isReviewersError, isReviewersPending } =
    useFetchReviewers();
  return (
    <div>
      <GenericEdit
        QueryKey="reviewers"
        isError={isReviewersError}
        isLoading={isReviewersPending}
        label="Reviewer"
        mutateFn={editReviewers}
        name="reviewer"
        isData={reviewersData}
      />
    </div>
  );
}
