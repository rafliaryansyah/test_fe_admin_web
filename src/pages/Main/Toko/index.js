import { Switch, Route } from "react-router-dom";

// pages
import ListToko from "./ListToko";
import Detail from "./Detail";

function Toko() {
  return (
    <Switch>
      <Route path="/toko/detail" component={Detail} />
      <Route component={ListToko} />
    </Switch>
  );
}

export default Toko;
