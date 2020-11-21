import PropTypes from 'prop-types';

const boardShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userid: PropTypes.string.isRequired,
});

export default boardShape;
