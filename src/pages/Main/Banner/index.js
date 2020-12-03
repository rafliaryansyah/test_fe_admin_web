import { createRef, useState } from 'react';
import useStyles from './styles';

// material-ui core
import {
  Button,
  IconButton,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  GridList,
  GridListTile,
  GridListTileBar
} from '@material-ui/core';

// material-ui icons
import {
  Delete,
  Edit,
  LibraryAdd,
  ArrowForwardIos,
  ArrowBackIos
} from '@material-ui/icons';

// components
import { CompDialog, ConfirmDialog } from '../../../components';

function Banner() {
  const classes = useStyles();

  const items = [
    {
      image:
        'https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg'
    },
    {
      image:
        'https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg'
    },
    {
      image:
        'https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg'
    },
    {
      image:
        'https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg'
    },
    {
      image:
        'https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg'
    },
    {
      image:
        'https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg'
    }
  ];

  const [open, setOpen] = useState(false);
  const [hapus, setHapus] = useState(false);

  const [form, setForm] = useState({
    tujuan: '',
    url: '',
    src_img: ''
  });

  const [scrollOffSet, setScrollOffSet] = useState(2000);

  const ArrowRef = createRef();

  const handleArrow = () => {
    ArrowRef.current.scrollLeft += scrollOffSet;
  };

  const handleDelete = () => {};

  return (
    <div className={classes.wrapper}>
      <label className={classes.titleGrid}>banner utama aktif</label>
      <div className={classes.section}>
        {scrollOffSet !== 2000 && (
          <IconButton onClick={() => handleArrow(setScrollOffSet(-2000))}>
            <ArrowBackIos />
          </IconButton>
        )}
        <div className={classes.wrapperCard} ref={ArrowRef}>
          <GridList className={classes.gridList} cols={2.5} cellHeight={300}>
            {items.map((item, i) => (
              <GridListTile key={i}>
                <img src={item.image} alt="image" />
                <GridListTileBar
                  title="title"
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  actionIcon={
                    <div>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => setHapus(true)}>
                        <Delete />
                      </IconButton>
                    </div>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        {scrollOffSet === 2000 && (
          <div>
            <IconButton onClick={() => handleArrow(setScrollOffSet(2000))}>
              <ArrowForwardIos />
            </IconButton>
          </div>
        )}
      </div>

      <label className={classes.titleGrid}>banner utama history</label>
      <div className={classes.section}>
        <div>
          <IconButton onClick={() => handleArrow(-2000)}>
            <ArrowBackIos />
          </IconButton>
        </div>
        <div className={classes.wrapperCard} ref={ArrowRef}>
          <GridList className={classes.gridList} cols={5.8} cellHeight={200}>
            {items.map((item, i) => (
              <GridListTile key={i}>
                <img src={item.image} alt="image" />
                <GridListTileBar
                  title="title"
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  actionIcon={
                    <div>
                      <IconButton color="primary">
                        <LibraryAdd />
                      </IconButton>
                      <IconButton color="inherit" onClick={() => setOpen(true)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => setHapus(true)}>
                        <Delete />
                      </IconButton>
                    </div>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div>
          <IconButton onClick={() => handleArrow(2000)}>
            <ArrowForwardIos />
          </IconButton>
        </div>
      </div>
      <div className={classes.wrapperButton}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}>
          buat banner
        </Button>
      </div>
      <label className={classes.titleGrid}>banner utama aktif</label>
      <div className={classes.section}>
        {scrollOffSet !== 2000 && (
          <IconButton onClick={() => handleArrow(setScrollOffSet(-2000))}>
            <ArrowBackIos />
          </IconButton>
        )}
        <div className={classes.wrapperCard} ref={ArrowRef}>
          <GridList className={classes.gridList} cols={2.5} cellHeight={300}>
            {items.map((item, i) => (
              <GridListTile key={i}>
                <img src={item.image} alt="image" />
                <GridListTileBar
                  title="title"
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  actionIcon={
                    <div>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => setHapus(true)}>
                        <Delete />
                      </IconButton>
                    </div>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        {scrollOffSet === 2000 && (
          <div>
            <IconButton onClick={() => handleArrow(setScrollOffSet(2000))}>
              <ArrowForwardIos />
            </IconButton>
          </div>
        )}
      </div>

      <label className={classes.titleGrid}>banner utama history</label>
      <div className={classes.section}>
        <div>
          <IconButton onClick={() => handleArrow(-2000)}>
            <ArrowBackIos />
          </IconButton>
        </div>
        <div className={classes.wrapperCard} ref={ArrowRef}>
          <GridList className={classes.gridList} cols={5.8} cellHeight={200}>
            {items.map((item, i) => (
              <GridListTile key={i}>
                <img src={item.image} alt="image" />
                <GridListTileBar
                  title="title"
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  actionIcon={
                    <div>
                      <IconButton color="primary">
                        <LibraryAdd />
                      </IconButton>
                      <IconButton color="inherit" onClick={() => setOpen(true)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => setHapus(true)}>
                        <Delete />
                      </IconButton>
                    </div>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div>
          <IconButton onClick={() => handleArrow(2000)}>
            <ArrowForwardIos />
          </IconButton>
        </div>
      </div>
      <div className={classes.wrapperButton}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}>
          buat banner
        </Button>
      </div>
      <CompDialog open={open} close={() => setOpen(false)} title="Form Banner">
        <FormControl component="fieldset" className={classes.jenisKelamin}>
          <FormLabel
            component="legend"
            // error={error.jenis_kelamin ? true : false}
          >
            Arahkan ke
          </FormLabel>
          <RadioGroup
            row
            aria-label="untuk"
            name="untuk"
            value={form.tujuan}
            // onChange={handleChange}
          >
            <FormControlLabel
              value="detail produk"
              control={<Radio color="primary" />}
              label="Detail Produk"
              // disabled={isActiveForm ? false : true}
            />
            <FormControlLabel
              value="list produk"
              control={<Radio color="primary" />}
              label="Lsit Produk"
              // disabled={isActiveForm ? false : true}
            />
          </RadioGroup>
        </FormControl>

        <InputLabel
          htmlFor="email"
          // error={error.email ? true : false}
          className={classes.label}>
          Url Produk
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            value={form.url}
            // onChange={handleChange}
            // error={error.email ? true : false}
          />
          <FormHelperText
            id="outlined-helper-text"
            // error={error.email ? true : false}
          >
            {/* {error.email} */}
          </FormHelperText>
        </FormControl>

        {form.src_img ? (
          <img src={form.src_img} alt="" className={classes.preview} />
        ) : (
          <div>
            <input type="file" id="upload" style={{ display: 'none' }} />
            <label htmlFor="upload" className={classes.upload}>
              Upload Foto
            </label>
          </div>
        )}

        <Button variant="contained" color="primary" fullWidth>
          simpan
        </Button>
      </CompDialog>
      <ConfirmDialog
        open={hapus}
        close={() => setHapus(false)}
        submit={handleDelete}
        title="Hapus Banner">
        yakin ingin menghapus Banner ?
      </ConfirmDialog>
    </div>
  );
}

export default Banner;
