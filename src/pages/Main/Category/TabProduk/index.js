import { useState } from 'react';
import useStyles from './styles';

// material-ui core
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// material-ui icons
import DeleteIcon from '@material-ui/icons/Delete';

// components
import { ConfirmDialog } from '../../../../components';

function TabProduk() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log('click');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
        <Button variant="text" color="primary" className={classes.content}>
          <img
            src="https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
            alt="banner"
            className={classes.img}
          />
          <div className={classes.deks}>
            <span className={classes.nama}>olahraga</span>
            <span className={classes.jumlahProduk}>produk terkait: 50</span>
          </div>
        </Button>
        <IconButton color="secondary" onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </div>

      <div className={classes.card}>
        <Button variant="text" color="primary" className={classes.content}>
          <img
            src="https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
            alt="banner"
            className={classes.img}
          />
          <div className={classes.deks}>
            <span className={classes.nama}>olahraga</span>
            <span className={classes.jumlahProduk}>produk terkait: 50</span>
          </div>
        </Button>
        <IconButton color="secondary" onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </div>

      <div className={classes.card}>
        <Button variant="text" color="primary" className={classes.content}>
          <img
            src="https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
            alt="banner"
            className={classes.img}
          />
          <div className={classes.deks}>
            <span className={classes.nama}>olahraga</span>
            <span className={classes.jumlahProduk}>produk terkait: 50</span>
          </div>
        </Button>
        <IconButton color="secondary" onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <ConfirmDialog
        open={open}
        close={() => setOpen(false)}
        submit={handleDelete}
        title="Hapus Kategori">
        Yakin ingin menghapus kategori ?
      </ConfirmDialog>
    </div>
  );
}

export default TabProduk;
