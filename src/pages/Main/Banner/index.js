import useStyles from './styles';
import { Switch, Redirect } from 'react-router-dom';

// material-ui core
import { AppBar, Tabs, Tab } from '@material-ui/core';

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
      <div>
        <AppBar position="static" color="transparent">
          <Tabs
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            value={location.pathname}
            onChange={(event, value) => history.push(value)}
            aria-label="disabled tabs example">
            <Tab label="Main" value="/banner/main" />
            <Tab label="HighLight" value="/banner/highlight" />
            <Tab label="Mini" value="/banner/mini" />
          </Tabs>
        </AppBar>
        <div style={{ backgroundColor: '#ffffff', padding: 15 }}>
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
