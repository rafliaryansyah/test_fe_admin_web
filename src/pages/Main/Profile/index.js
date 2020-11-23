import useStyles from "./styles";
import { Switch, Route, Redirect } from "react-router-dom";

// material-ui core
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// pages
import User from "./User";
import ChangePassword from "./ChangePassword";

function Profile({ history, location }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Tabs
        value={location.pathname}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, value) => history.push(value)}
        aria-label="disabled tabs example"
      >
        <Tab label="Profile" value="/profile" />
        <Tab label="Change Password" value="/profile/change-password" />
      </Tabs>
      <div className={classes.tabsMain}>
        <Switch>
          <Route exact path="/profile" component={User} />
          <Route path="/profile/change-password" component={ChangePassword} />
          <Redirect to="/profile" />
        </Switch>
      </div>
    </div>
  );
}

export default Profile;
