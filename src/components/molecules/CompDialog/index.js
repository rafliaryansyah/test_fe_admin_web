import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// react icons
import { IoCloseOutline } from 'react-icons/io5';

function CompDialog({ open, close, title, children }) {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={close}>
      <DialogActions>
        <IconButton onClick={close} color="primary">
          <IoCloseOutline />
        </IconButton>
      </DialogActions>
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        {title}
      </DialogTitle>
      <DialogContent>
        <div className={classes.wrapperContent}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

CompDialog.propTypes = {
  open: propTypes.bool.isRequired,
  close: propTypes.func.isRequired,
  title: propTypes.string,
  children: propTypes.element
};

export default CompDialog;
