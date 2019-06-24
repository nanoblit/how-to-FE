import React from 'react';
import axios from 'axios';

// Add spinner and display error

const Register = () => {
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();
  const accountTypeRef = React.createRef();

  const register = (username, password, type) => {
    console.log({ username, password, type });
    axios
      .post('http://localhost:8000/register', { username, password, type })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
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
    <form onSubmit={handleRegister}>
      <label htmlFor="username">
        Username
        <input ref={usernameRef} id="username" />
      </label>
      <label htmlFor="password">
        Password
        <input ref={passwordRef} id="password" />
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
  );
};

export default Register;
