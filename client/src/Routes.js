import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Board from './containers/Board';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Alert from './containers/Alert';
import PrivateRoute from './containers/PrivateRoute';

export default function Routes() {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <PrivateRoute exact path='/' component={Board} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </section>
  );
}
