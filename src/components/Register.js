import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  Button, Heading, FormField, TextInput, Select,
} from 'grommet';

// Add spinner and display error

const RegisterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    label, button, select, >div {
      margin-bottom: 20px;
    }
  }

  p {
    color: red;
  }
`;

const Register = ({ history }) => {
  const [registerError, setRegisterError] = useState('');
  const [accountType, setAccountType] = useState('viewer');
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const register = (username, password, type) => {
    axios
      .post('https://bw-how-to.herokuapp.com/register', { username, password, type })
      .then(res => {
        history.push('/login');
        console.log('.');
      })
      .catch(error => {
        setRegisterError("Couldn't register");
        console.log(error);
      });
  };

  const handleRegister = e => {
    e.preventDefault();
    register(usernameRef.current.value.trim(), passwordRef.current.value.trim(), accountType);
  };

  return (
    <RegisterDiv>
      <Heading>Register</Heading>
      <form onSubmit={handleRegister}>
        <FormField>
          <TextInput ref={usernameRef} placeholder="Username" required />
        </FormField>
        <FormField>
          <TextInput ref={passwordRef} placeholder="Password" type="password" required />
        </FormField>
        <div>Account type</div>
        <Select
          options={['viewer', 'creator']}
          value={accountType}
          onChange={({ option }) => setAccountType(option)}
        />
        <Button type="submit" label="Register" />
      </form>
      {registerError && <p>{registerError}</p>}
    </RegisterDiv>
  );
};

export default Register;
