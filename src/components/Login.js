import React, { useState } from 'react';
import axios from 'axios';

// Add spinner and display error

const Login = ({ history }) => {
  const [loginError, setLoginError] = useState('');
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const login = (username, password) => {
    axios
      .post('http://localhost:8000/login', { username, password })
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
    <div>
      <p>Log in</p>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">
          Username
          <input ref={usernameRef} id="username" required />
        </label>
        <label htmlFor="password">
          Password
          <input ref={passwordRef} id="password" type="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default Login;
