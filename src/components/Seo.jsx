// components/Seo.jsx
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const Seo = ({ title, description, keywords = '', author = 'MyApp Team' }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
    <meta name="author" content={author} />
  </Helmet>
);

export default Seo;

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
};
