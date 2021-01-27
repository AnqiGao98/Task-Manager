import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Routes from './Routes';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from './actions/auth';

function App({ auth: { isAuthenticated, loading }, logout }) {
  return (
    <div className='App container py-3'>
      <Navbar
        collapseOnSelect
        bg='dark'
        variant='dark'
        expand='md'
        className='mb-3'
      >
        <LinkContainer to='/'>
          <Navbar.Brand>Trello</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle />

        <Navbar.Collapse className='justify-content-end'>
          <Nav activeKey={window.location.pathname}>
            {!isAuthenticated && (
              <LinkContainer to='signup'>
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
            )}

            {!isAuthenticated && (
              <LinkContainer to='login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            {isAuthenticated && (
              <LinkContainer to='/'>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(App);
