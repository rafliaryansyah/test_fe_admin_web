import useStyles from './styles';

// material-ui core
import IconButton from '@material-ui/core/IconButton';

// material-ui icons
import DeleteIcon from '@material-ui/icons/Delete';

function TabProduk() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
        <div className={classes.action}>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={classes.content}>
          <img
            src="https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
            alt="banner"
            className={classes.img}
          />
          <div className={classes.deks}>
            <span className={classes.nama}>olahraga</span>
            <span className={classes.jumlahProduk}>produk terkait: 50</span>
          </div>
        </div>
      </div>
      <div className={classes.card}>
        <div className={classes.action}>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={classes.content}>
          <img
            src="https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
            alt="banner"
            className={classes.img}
          />
          <div className={classes.deks}>
            <span className={classes.nama}>olahraga</span>
            <span className={classes.jumlahProduk}>produk terkait: 50</span>
          </div>
        </div>
      </div>
      <div className={classes.card}>
        <div className={classes.action}>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={classes.content}>
          <img
            src="https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
            alt="banner"
            className={classes.img}
          />
          <div className={classes.deks}>
            <span className={classes.nama}>olahraga</span>
            <span className={classes.jumlahProduk}>produk terkait: 50</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabProduk;
