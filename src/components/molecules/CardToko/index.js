import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import { Avatar } from '@material-ui/core';

function CardToko({ srcImage, nama, status, alamat, bukaSejak, handleDetail }) {
  const classes = useStyles();

  return (
    <div className={classes.card} onClick={handleDetail}>
      <div className={classes.info}>
        <Avatar
          alt={name}
          src={srcImage}
          variant="rounded"
          className={classes.avatar}
        />
        <div className={classes.text}>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>nama </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>{nama}</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>status </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.aktif}>{status}</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>alamat </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>{alamat}</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>buka sejak </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>{bukaSejak}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

CardToko.propTypes = {
  srcImage: propTypes.string.isRequired,
  nama: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  alamat: propTypes.string.isRequired,
  bukaSejak: propTypes.string.isRequired,
  handleDetail: propTypes.func.isRequired
};

export default CardToko;
