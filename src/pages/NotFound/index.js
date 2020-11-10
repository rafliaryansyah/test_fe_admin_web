import useStyles from "./styles";

function NotFound() {
  const classes = useStyles();

  return <div className={classes.wrapper}>Halaman tidak diketahui!</div>;
}

export default NotFound;
