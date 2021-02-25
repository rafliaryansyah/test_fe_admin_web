import { Switch, Route } from 'react-router-dom';

// pages
import ListCustomers from './ListCustomers';
import Detail from './Detail';

function Customers() {
  return (
    <Switch>
      <Route exact path="/user/:id" component={Detail} />
      <Route exact component={ListCustomers} />
    </Switch>
  );
}

export default Customers;
