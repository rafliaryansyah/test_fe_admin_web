import { Fragment } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import {
  Typography,
  IconButton,
  TableCell,
  TableRow,
  Box,
  Collapse
} from '@material-ui/core';

// icons
import {
  IoPencilOutline,
  IoChevronDownOutline,
  IoChevronUpOutline
} from 'react-icons/io5';

function RowTable({ row, open, setOpen, setOpenForm }) {
  const classes = useStyles();

  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell align="left">
          <IconButton aria-label="expand row" size="small" onClick={setOpen}>
            {open ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.name}
        </TableCell>
        <TableCell align="right">
          <IconButton color="primary" onClick={setOpenForm}>
            <IoPencilOutline />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Akses
              </Typography>

              <div className={classes.list}>
                {row.permissions?.map((permission, i) => (
                  <span key={i} className={classes.item}>
                    {permission.name}
                  </span>
                ))}
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

RowTable.propTypes = {
  row: propTypes.shape({
    name: propTypes.string,
    permissions: propTypes.arrayOf(
      propTypes.shape({
        name: propTypes.string
      })
    )
  }),
  open: propTypes.bool,
  setOpen: propTypes.func,
  setOpenForm: propTypes.func
};

export default RowTable;
