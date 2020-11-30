import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // border: "1px solid",
  },

  wrapperTitlePage: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 15,
    padding: 5,
    marginBottom: 15
  },

  wrapperInfoToko: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
    justifyContent: 'space-between',
    gridGap: 15
  },

  cardDetailToko: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 15,
    padding: 15,
    height: 90,

    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
      height: 45
    }
  },

  profilToko: {
    width: 150,
    height: 150,
    borderRadius: '25%',
    boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.1)',
    objectFit: 'cover',

    [theme.breakpoints.down('sm')]: {
      width: 90,
      height: 90
    }
  },

  nama: {
    fontSize: 25,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold',
    lineHeight: 0,

    [theme.breakpoints.down('sm')]: {
      fontSize: 15
    }
  },

  deks: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 15
  },

  alamat: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'lighter',
    color: '#424242',

    [theme.breakpoints.down('sm')]: {
      fontSize: 10
    }
  },

  jumlah: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold',

    [theme.breakpoints.down('sm')]: {
      fontSize: 10
    }
  },

  produkTerjual: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'lighter',
    color: '#424242',

    [theme.breakpoints.down('sm')]: {
      fontSize: 10
    }
  },

  cardMenuTabToko: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    padding: 15
  }
}));

export default useStyles;
