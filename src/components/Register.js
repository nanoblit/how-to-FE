import React, { useState } from 'react';
import axios from 'axios';

// Add spinner and display error

const Register = ({ history }) => {
  const [registerError, setRegisterError] = useState('');
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();
  const accountTypeRef = React.createRef();

  const register = (username, password, type) => {
    axios
      .post('http://localhost:8000/register', { username, password, type })
      .then(res => {
        history.push('/login');
      })
      .catch(error => {
        setRegisterError("Couldn't register");
        console.log(error);
      });
  };

  const handleRegister = e => {
    e.preventDefault();
    register(
      usernameRef.current.value.trim(),
      passwordRef.current.value.trim(),
      accountTypeRef.current.value,
    );
  };

  return (
    <div>
      <p>Register</p>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">
          Username
          <input ref={usernameRef} id="username" />
        </label>
        <label htmlFor="password">
          Password
          <input ref={passwordRef} id="password" type="password" />
        </label>
        <label htmlFor="accountType">
          Username
          <select ref={accountTypeRef} id="accountType">
            <option value="viewer">Viewer</option>
            <option value="creator">Creator</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
