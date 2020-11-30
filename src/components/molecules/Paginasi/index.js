import useStyles from './styles';
import propTypes from 'prop-types';

import Pagination from '@material-ui/lab/Pagination';

function Paginasi({ count, page, onClick }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        page={page}
        onClick={onClick}
      />
    </div>
  );
}

Paginasi.propTypes = {
  count: propTypes.any,
  page: propTypes.any,
  onClick: propTypes.func.isRequired
}

export default Paginasi;
