import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './views/Logon';
import Register from './views/Register';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}