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
import Orders from "./Orders";

function Detail({ history, location }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitlePage}>
        <IconButton onClick={() => history.push("/customers")}>
          <ArrowBack />
        </IconButton>
      </div>

      <div className={classes.wrapperInfoToko}>
        <div className={classes.cardDetailToko}>
          <img
            src="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
            alt="profile customer"
            className={classes.profilToko}
          />
          <div>
            <p className={classes.nama}>Jhon Doe</p>
            <div className={classes.deks}>
              <p className={classes.teks}>jhondoe@gmail.com</p>
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
            <Tab label="Beranda" value="/customers/detail" />
            <Tab label="Orders" value="/customers/detail/orders" />
          </Tabs>
          <div className={classes.tabsMain}>
            <Switch>
              <Route exact path="/customers/detail" component={Beranda} />
              <Route path="/customers/detail/orders" component={Orders} />
              <Redirect to="/customers/detail" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Detail;
