import useStyles from './styles';
import propTypes from 'prop-types';

function CardToko({ nama, status, alamat, bukaSejak, handleDetail }) {
  const classes = useStyles();

  return (
    <div className={classes.card} onClick={handleDetail}>
      <div className={classes.info}>
        <img
          src="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
          alt="foto"
          className={classes.img}
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
  nama: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  alamat: propTypes.string.isRequired,
  bukaSejak: propTypes.string.isRequired,
  handleDetail: propTypes.func.isRequired
};

export default CardToko;
