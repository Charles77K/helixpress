import { deleteReviewers } from '../../utils/http';
import GenericDelete from '../components/GenericDelete';
import { useFetchReviewers } from '../components/Tanstack';

export default function DeleteReviewer() {
  const { reviewersData, isReviewersError, isReviewersPending } =
    useFetchReviewers();
  return (
    <div>
      <GenericDelete
        QueryKey="reviewers"
        isError={isReviewersError}
        isLoading={isReviewersPending}
        label="Reviewers"
        mutateFn={deleteReviewers}
        isData={reviewersData}
      />
    </div>
  );
}
