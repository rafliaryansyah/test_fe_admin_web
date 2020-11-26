import useStyles from './styles';
import propTypes from 'prop-types';

const CardCustomers = ({
  srcImage,
  nama,
  status,
  jenisKelamin,
  email,
  noTelp,
  handleDetail
}) => {
  const classes = useStyles();

  return (
    <div className={classes.card} onClick={handleDetail}>
      <div className={classes.info}>
        <img src={srcImage} alt="foto" className={classes.img} />
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
            <span className={classes.isi}>{status}</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>jenis kelamin </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>{jenisKelamin}</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>email </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.email}>{email}</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>no telp </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>{noTelp}</span>
          </div>
        </div>
      </div>
      <div className={classes.garis}></div>
      <div className={classes.role}>
        <p className={classes.isiRole}>customer</p>
        <p className={classes.isiRoleNonAktif}>SA.Merchant</p>
      </div>
    </div>
  );
};

CardCustomers.propTypes = {
  srcImage: propTypes.string.isRequired,
  nama: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  jenisKelamin: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  noTelp: propTypes.string.isRequired,
  handleDetail: propTypes.func.isRequired
};

export default CardCustomers;
