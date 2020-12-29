import useStyles from './styles';
import propTypes from 'prop-types';

import Pagination from '@material-ui/lab/Pagination';

function Paginasi({ count, page, onChange }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={count}
        page={page}
        onChange={onChange}
      />
    </div>
  );
}

Paginasi.propTypes = {
  count: propTypes.number,
  page: propTypes.number,
  onChange: propTypes.func
};

export default Paginasi;
