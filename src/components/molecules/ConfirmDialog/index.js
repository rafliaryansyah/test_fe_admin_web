import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

function ConfirmDialog({ open, close, title, submit, children }) {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <DialogContent>
        <div className={classes.teks}>{children}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>batal</Button>
        <Button
          variant="text"
          onClick={submit}
          color="primary"
          className={classes.lanjut}>
          yakin
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
