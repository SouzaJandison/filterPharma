import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './views/Logon';
import Register from './views/Register';
import NewProduct from './views/NewProduct';
import ShoppingCar from './views/ShoppingCar';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={NewProduct} />
        <Route path="/shoppingCar" component={ShoppingCar} />
      </Switch>
    </BrowserRouter>
  );
}