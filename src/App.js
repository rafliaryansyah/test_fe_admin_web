import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Notistack (snackbar alerts)
import { SnackbarProvider } from "notistack";

// Redux
import { Provider } from "react-redux";
import { store } from "./modules/Redux";

// Theme
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./modules/Theme";

// Pages
import { Login, Main, NotFound } from "./pages";

// components
import { PrivateRoute } from "./components";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Main} />
              <PrivateRoute path="/customers" component={Main} />
              <PrivateRoute path="/toko" component={Main} />
              <PrivateRoute path="/orders" component={Main} />
              <PrivateRoute path="/category" component={Main} />
              <PrivateRoute path="/voucher" component={Main} />
              <PrivateRoute path="/profile" component={Main} />
              <Route path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
