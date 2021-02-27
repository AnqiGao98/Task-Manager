import React, { useEffect } from 'react';
import './App.css';
import Routes from './Routes';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout, loadUser } from './actions/auth';
import NavBar from './containers/NavBar';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes />
      </Router>
    </Provider>
  );
};

export default App;
