import useStyles from './styles';
import { Switch, Redirect } from 'react-router-dom';

// material-ui core
import { Tabs, Tab } from '@material-ui/core';

// components
import { PrivateRoute } from 'components';

// pages
import TabMain from './TabMain';
import TabHighLight from './TabHighLight';
import TabMini from './TabMini';

function Banner({ history, location }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.menuTabToko}>
        <Tabs
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          value={location.pathname}
          onChange={(event, value) => history.push(value)}
          aria-label="disabled tabs example">
          <Tab label="Main Banner" value="/banner/main" />
          <Tab label="HighLight" value="/banner/highlight" />
          <Tab label="Mini Banner" value="/banner/mini" />
        </Tabs>
        <div className={classes.tabsMain}>
          <Switch>
            <PrivateRoute exact path="/banner/main" component={TabMain} />
            <PrivateRoute path="/banner/highlight" component={TabHighLight} />
            <PrivateRoute path="/banner/mini" component={TabMini} />
            <Redirect to="/banner/main" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Banner;
