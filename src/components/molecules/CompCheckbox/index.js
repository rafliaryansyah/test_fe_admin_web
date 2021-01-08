import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import { FormControlLabel, Checkbox } from '@material-ui/core';

// components
import { ConfirmDialog } from 'components';

function CompCheckbox({
  name,
  value,
  label,
  onChange,
  open,
  close,
  updateRole
}) {
  const classes = useStyles();

  return (
    <div>
      <FormControlLabel
        control={<Checkbox onChange={onChange} name={name} value={value} />}
        label={label}
        className={classes.checkbox}
      />
      <ConfirmDialog
        open={open}
        close={close}
        title="Konfirmasi Role"
        submit={updateRole}>
        Yakin ingin menghapus role ?
      </ConfirmDialog>
    </div>
  );
}

CompCheckbox.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
  label: propTypes.string,
  onChange: propTypes.func.isRequired,
  open: propTypes.bool,
  close: propTypes.func,
  updateRole: propTypes.func.isRequired
};

export default CompCheckbox;
