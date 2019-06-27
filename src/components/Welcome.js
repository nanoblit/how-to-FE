import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading } from 'grommet';

const Welcome = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Heading>Welcome to How-To!</Heading>
    <div>
      <Link to="/login">
        <Button label="Login" />
      </Link>{' '}
      <Link to="/register">
        <Button label="Sign Up" />
      </Link>
    </div>
  </div>
);

export default Welcome;
