import { useFetchReviewers } from '../components/Tanstack';
import GenericView from '../components/GenericView';

export default function ViewReviewers() {
  const { reviewersData, isReviewersError, isReviewersPending } =
    useFetchReviewers();
  return (
    <div>
      <GenericView
        genericData={reviewersData}
        genericDataError={isReviewersError}
        genericDataLoading={isReviewersPending}
        label={'Reviewers'}
      />
    </div>
  );
}
