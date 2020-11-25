import useStyles from "./styles";

function CardCustomers() {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <div className={classes.info}>
        <img
          src="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
          alt="foto"
          className={classes.img}
        />
        <div className={classes.text}>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>nama </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>nabila syaharani</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>status </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>aktif</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>jenis kelamin </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>pria</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>email </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.email}>nabila.syaharani@gmail.com</span>
          </div>
          <div className={classes.labelText}>
            <div className={classes.label}>
              <span className={classes.isi}>no telp </span>
              <span className={classes.isi}>:</span>
            </div>
            <span className={classes.isi}>081231232322</span>
          </div>
        </div>
      </div>
      <div className={classes.garis}></div>
      <div className={classes.role}>
        <p className={classes.isiRole}>customer</p>
        <p className={classes.isiRoleNonAktif}>SA.Merchant</p>
      </div>
    </div>
  );
}

export default CardCustomers;
