import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles/Login.css';
import { login } from './../actions/auth';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    login({ username, password });
    history.push('/');
  }

  return (
    <div className='Login'>
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

        <Form.Group size='lg' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your Password'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button block size='lg' type='submit' disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
};
const mapStateToProps = (state) => {};
export default connect(mapStateToProps, { login })(Login);
