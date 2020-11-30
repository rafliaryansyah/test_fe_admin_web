import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { appRoutes } from './routes';

// Notistack (snackbar alerts)
import { SnackbarProvider } from 'notistack';

// Redux
import { Provider } from 'react-redux';
import { store } from './modules/Redux';

// Theme
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './modules/Theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
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
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
