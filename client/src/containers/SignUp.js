import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import './styles/SignUp.css';
import { signup } from './../actions/auth';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SignUp = ({ auth: { isAuthenticated }, signup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    signup({ username, email, password });
  }

  if (isAuthenticated) {
    return <Redirect to='/'></Redirect>;
  }
  return (
    <div className='SignUp'>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group size='lg' controlId='formBasicUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type='text'
            placeholder='Please Enter Username'
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group size='lg' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type='text'
            placeholder='Please Enter Email'
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group size='lg' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Set Your Password'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button block size='lg' type='submit' disabled={!validateForm()}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signup })(SignUp);
