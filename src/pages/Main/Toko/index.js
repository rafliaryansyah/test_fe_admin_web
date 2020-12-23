import { Switch } from 'react-router-dom';

// components
import { PrivateRoute } from 'components';

// pages
import ListToko from './ListToko';
import Detail from './Detail';

function Toko() {
  return (
    <Switch>
      <PrivateRoute path="/toko/:id" component={Detail} />
      <PrivateRoute component={ListToko} />
    </Switch>
  );
}

export default Toko;
