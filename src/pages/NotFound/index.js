import useStyles from './styles';

// material-ui core
import Button from "@material-ui/core/Button";

// assets
import { PixelTrueError } from "../../assets";

function NotFound({ history }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <img
        src={PixelTrueError}
        alt="ilustration"
        className={classes.ilustration}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.push("/")}
      >
        back to dashboard
      </Button>
    </div>
  );
}

export default NotFound;
