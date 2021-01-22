import useStyles from './styles';

// material-ui core
import { FormControl, OutlinedInput, InputAdornment } from '@material-ui/core';

// react icons
import { IoSearchOutline } from 'react-icons/io5';

// components
import { CardProduk } from 'components';

function ProdukTerkait() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.itemSatu}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Cari"
            // onChange={e =>
            //   readVoucher(e.target.value).then(res =>
            //     setDataVoucher(res.data.data)
            //   )
            // }
            endAdornment={
              <InputAdornment position="start">
                <IoSearchOutline />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className={classes.konten}>
          {}
      </div>
    </div>
  );
}

export default ProdukTerkait;
