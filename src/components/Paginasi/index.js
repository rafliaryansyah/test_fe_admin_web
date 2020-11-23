import useStyles from "./styles";

import Pagination from "@material-ui/lab/Pagination";

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

export default Paginasi;
