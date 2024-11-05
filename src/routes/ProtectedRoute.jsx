import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element }) {
  const token = useSelector((state) => state.auth.token);
  console.log('protected token ' + token);

  return token ? element : <Navigate to={'/login'} replace />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
