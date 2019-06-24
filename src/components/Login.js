import React from 'react';
import axios from 'axios';

// Add spinner and display error

const Login = () => {
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const login = (username, password) => {
    console.log({ username, password });
    axios
      .post('http://localhost:8000/login', { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const handleLogin = e => {
    e.preventDefault();
    login(usernameRef.current.value.trim(), passwordRef.current.value.trim());
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">
        Username
        <input ref={usernameRef} id="username" required />
      </label>
      <label htmlFor="password">
        Password
        <input ref={passwordRef} id="password" required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
