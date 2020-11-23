import useStyles from "./styles";

function Orders() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTable}>
        <table cellSpacing="0" className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>No</th>
              <th className={classes.th}>Tanggal</th>
              <th className={classes.th}>Jumlah Produk</th>
              <th className={classes.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className={classes.tr}>
              <td className={classes.td}>1</td>
              <td className={classes.td}>1 November 2020</td>
              <td className={classes.td}>3</td>
              <td className={classes.td}>Selesai</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
