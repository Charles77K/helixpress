import PropTypes from 'prop-types';
import { useFetchById } from '../../services/hooks';

const JournalSubjectList = ({ id }) => {
  // const { data: subjects, isPending } = useFetchById(
  //   '/subjects/:id/journals',
  //   id
  // );

  return <div>JournalSubjectList</div>;
};

export default JournalSubjectList;

JournalSubjectList.propTypes = {
  id: PropTypes.string.isRequired,
};
