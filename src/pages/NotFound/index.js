import useStyles from "./styles";

// material-ui core
import Button from "@material-ui/core/Button";

// assets
import NotFoundIlustration from "../../assets/pixeltrue-error-1.svg";

function NotFound({ history }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <img
        src={NotFoundIlustration}
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
