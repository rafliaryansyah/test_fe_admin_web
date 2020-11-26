import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

function ConfirmDialog({ open, close, title, submit, children }) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <label className={classes.title}>{title}</label>
      <DialogContent>
        <DialogContentText className={classes.teks}>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>batal</Button>
        <Button
          variant="text"
          onClick={submit}
          color="primary"
          className={classes.ya}>
          ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  open: propTypes.bool.isRequired,
  close: propTypes.func.isRequired,
  title: propTypes.string,
  submit: propTypes.func.isRequired,
  children: propTypes.element
};

export default ConfirmDialog;
