import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Alert from './containers/Alert';

export default function Routes() {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </section>
  );
}
