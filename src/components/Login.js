import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  Button, Heading, FormField, TextInput,
} from 'grommet';

// Add spinner and display error

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    label, button {
      margin-bottom: 20px;
    }
  }

  p {
    color: red;
  }
`;

const Login = ({ history }) => {
  const [loginError, setLoginError] = useState('');
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const login = (username, password) => {
    axios
      .post('https://bw-how-to.herokuapp.com/login', { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('type', res.data.type);
        localStorage.setItem('id', res.data.id);
        history.push('/');
      })
      .catch(error => {
        setLoginError("Couldn't log in");
        console.log(error);
      });
  };

  const handleLogin = e => {
    e.preventDefault();
    login(usernameRef.current.value.trim(), passwordRef.current.value.trim());
  };

  return (
    <LoginDiv>
      <Heading>Log in</Heading>
      <form onSubmit={handleLogin}>
        <FormField>
          <TextInput ref={usernameRef} placeholder="Username" required />
        </FormField>
        <FormField>
          <TextInput ref={passwordRef} placeholder="Password" type="password" required />
        </FormField>
        <Button type="submit" label="Login" />
      </form>
      {loginError && <p>{loginError}</p>}
    </LoginDiv>
  );
};

export default Login;
