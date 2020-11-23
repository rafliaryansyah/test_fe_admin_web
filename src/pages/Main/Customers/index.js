import { Switch, Route } from "react-router-dom";

// pages
import ListCustomers from "./ListCustomers";
import Detail from "./Detail";

function Customers() {
  return (
    <Switch>
      <Route path="/customers/detail" component={Detail} />
      <Route component={ListCustomers} />
    </Switch>
  );
}

export default Customers;
