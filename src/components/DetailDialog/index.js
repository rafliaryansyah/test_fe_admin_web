import useStyles from "./styles";

// material-ui core
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function DetailDialog({ open, close, title, children }) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <div className={classes.wrapperContent}>{children}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          tutup
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailDialog;
