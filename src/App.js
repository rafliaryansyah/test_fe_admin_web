import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";

// Theme
import { theme } from "./configs/Theme";

// Pages
import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

// components
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
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
  );
}

export default App;
