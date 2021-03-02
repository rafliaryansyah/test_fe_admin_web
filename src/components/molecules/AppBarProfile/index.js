import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import { IconButton, Avatar } from '@material-ui/core';

function AppBarProfile({ onClick }) {
  const classes = useStyles();

  // data profile admin form localstorage
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className={classes.wrapper}>
      <IconButton onClick={onClick}>
        <Avatar src={user ? user.image : ''} />
      </IconButton>

      <div className={classes.teks}>
        <span className={classes.nama}>{`Halo, ${user ? user.name : ''}`}</span>
        <span className={classes.akses}>
          {user
            ? (user.role === 'super-admin-ecommerce' &&
                'super admin ecommerce') ||
              (user.role === 'admin-ecommerce' && 'admin ecommerce') ||
              (user.role === 'contributor-ecommerce' &&
                'Contributor Ecommerce') ||
              (user.role === 'finance-ecommerce' && 'Finance Ecommerce')
            : 'ecommerce'}
        </span>
      </div>
    </div>
  );
}

AppBarProfile.propTypes = {
  onClick: propTypes.func
};

export default AppBarProfile;
