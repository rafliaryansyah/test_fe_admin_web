import useStyles from './styles';

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p className={classes.title}>2000</p>
          <p className={classes.deks}>customers</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
