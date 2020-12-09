import useStyles from './styles';

// materail-ui core
import { LinearProgress } from '@material-ui/core';

function LoadingApp() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.loadingApp}>
        Grocery Admin App
        <LinearProgress />
      </div>
    </div>
  );
}

export default LoadingApp;
