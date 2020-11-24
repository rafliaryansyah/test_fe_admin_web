import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { appRoutes } from 'routes';

function App() {
  return (
    <Router>
      <Switch>
        {appRoutes.map(route => (
          <Route
            key={route.id}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
