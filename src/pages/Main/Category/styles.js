import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    // border: "1px solid",
    display: 'grid'
  },

  pencarian: {
    backgroundColor: '#ffffff',
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridGap: 15,
    marginBottom: 30,
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)'
  },

  upload: {
    padding: 50,
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid'
  },

  preview: {
    objectFit: 'cover',
    width: 250,
    height: 130
  },

  submit: {
    marginTop: 15
  }
}));

export default useStyles;
