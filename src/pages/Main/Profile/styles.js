import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: '#ffffff',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridGap: 15,
    padding: 15
  },

  itemFotoDanRoles: {
    display: 'flex',
    flexDirection: 'column',
    gridGap: 15,
    width: 300
  },

  preview: {
    objectFit: 'cover',
    width: '100%',
    height: 300
  },

  actionUploadFile: {
    display: 'flex',
    justifyContent: 'space-between',
    gridGap: 15
  },

  item: {
    width: '100%',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    padding: '5px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gridGap: 3,
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontSize: 13
  },

  wrapperInfo: {
    display: 'grid'
  },

  wrapperButton: {
    display: 'flex',
    flexDirection: 'column',
    gridGap: 15,
    marginTop: 15
  }
}));

export default useStyles;
