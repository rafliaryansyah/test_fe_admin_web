import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// material-ui icons
import { ArrowBack } from '@material-ui/icons';
import { useState } from 'react';

function Detail({ history }) {
  const classes = useStyles();

  const [roles, setRoles] = useState({
    customer: true,
    sa_merchant: false
  });

  const handleChange = e => {
    setRoles({ ...roles, [e.target.name]: e.target.checked });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitlePage}>
        <IconButton onClick={() => history.push('/customers')}>
          <ArrowBack />
        </IconButton>
      </div>

      <div className={classes.wrapperInfo}>
        <div className={classes.itemFotoDanRoles}>
          <img
            src="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
            alt="foto"
            className={classes.img}
          />
          <div className={classes.roles}>
            <p className={classes.title}>roles :</p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={roles.customer}
                  onChange={handleChange}
                  name="customer"
                  color="primary"
                />
              }
              label="Customer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={roles.sa_merchant}
                  onChange={handleChange}
                  name="sa_merchant"
                  color="primary"
                />
              }
              label="SA.Merchant"
            />
          </div>
        </div>

        <div className={classes.itemDataUser}>
          <div className={classes.input}>
            <label className={classes.label}>nama</label>
            <span className={classes.text}>nabila syaharani</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>tanggal lahir</label>
            <span className={classes.text}>21 februari 1995</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>jenis kelamin</label>
            <span className={classes.text}>perempuan</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>email</label>
            <span className={classes.text}>nabsyah@gmail.com</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>nomor telepon</label>
            <span className={classes.text}>+6217178909121</span>
          </div>
          <div className={classes.wrapperButton}>
            <Button variant="contained" color="primary">nonaktifkan</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

Detail.propTypes = {
  history: propTypes.object
};

export default Detail;
