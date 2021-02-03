import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import { Avatar } from '@material-ui/core';

function CardKurir({
  srcImage,
  nama,
  status,
  code,
  checkCost,
  checkReceipt,
  children
}) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes.info}>
        <Avatar
          alt={name}
          src={srcImage}
          variant="rounded"
          className={classes.avatar}
        />
        <div className={classes.text}>
          {code && (
            <div className={classes.labelText}>
              <div className={classes.label}>
                <span className={classes.isi}>kode </span>
                <span className={classes.isi}>:</span>
              </div>
              <span className={classes.isi}>{code}</span>
            </div>
          )}
          {nama && (
            <div className={classes.labelText}>
              <div className={classes.label}>
                <span className={classes.isi}>nama </span>
                <span className={classes.isi}>:</span>
              </div>
              <span className={classes.isi}>{nama}</span>
            </div>
          )}
          {status && (
            <div className={classes.labelText}>
              <div className={classes.label}>
                <span className={classes.isi}>status </span>
                <span className={classes.isi}>:</span>
              </div>
              <span className={classes.aktif}>{status}</span>
            </div>
          )}
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>tanda terima</span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>{checkReceipt}</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>periksa biaya</span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>{checkCost}</span>
          </div>
        </div>
      </div>
      <br />
      <div className={classes.action}>{children}</div>
    </div>
  );
}

CardKurir.propTypes = {
  srcImage: propTypes.string.isRequired,
  code: propTypes.string.isRequired,
  nama: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  checkReceipt: propTypes.bool,
  checkCost: propTypes.bool,
  onClick: propTypes.func,
  children: propTypes.element
};

export default CardKurir;
