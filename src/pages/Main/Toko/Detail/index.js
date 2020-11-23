import useStyles from "./styles";
import { Switch, Route, Redirect } from "react-router-dom";

// material-ui core
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// material-ui icons
import { ArrowBack } from "@material-ui/icons";

// pages tab
import Beranda from "./Beranda";
import Produk from "./Produk";
import Ulasan from "./Ulasan";

function Detail({ history, location }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitlePage}>
        <IconButton onClick={() => history.push("/toko")}>
          <ArrowBack />
        </IconButton>
      </div>

      <div className={classes.wrapperInfoToko}>
        <div className={classes.cardDetailToko}>
          <img
            src="https://ecs7-p.tokopedia.net/img/cache/215-square/shops-1/2019/3/14/5302311/5302311_37d54ee7-b6a1-467b-9ba7-b852243d0bdb.jpg"
            alt="profile toko"
            className={classes.profilToko}
          />
          <div>
            <p className={classes.nama}>Photobook Indonesia</p>
            <div className={classes.deks}>
              <p className={classes.alamat}>Jakarta Selatan</p>
              <p className={classes.produkTerjual}>
                <span className={classes.jumlah}>327</span> Terjual
              </p>
            </div>
          </div>
        </div>
        <div className={classes.cardMenuTabToko}>
          <Tabs
            value={location.pathname}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, value) => history.push(value)}
            aria-label="disabled tabs example"
          >
            <Tab label="Beranda" value="/toko/detail" />
            <Tab label="Produk" value="/toko/detail/produk" />
            <Tab label="Ulasan" value="/toko/detail/ulasan" />
          </Tabs>
          <div className={classes.tabsMain}>
            <Switch>
              <Route exact path="/toko/detail" component={Beranda} />
              <Route path="/toko/detail/produk" component={Produk} />
              <Route path="/toko/detail/ulasan" component={Ulasan} />
              <Redirect to="/toko/detail" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Detail;
