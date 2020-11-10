import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
