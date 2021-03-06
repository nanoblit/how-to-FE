import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import authedAxios from '../misc/authedAxios';

// Add spinner when authorizing

const withAuth = Component => props => {
  const [authorizing, setAuthorizing] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const authorize = () => {
    const id = localStorage.getItem('id');
    if (id) {
      authedAxios()
        .get(`https://bw-how-to.herokuapp.com/users/${id}`)
        .then(() => {
          setAuthorized(true);
          setAuthorizing(false);
        })
        .catch(error => {
          console.log(error.message);
          setAuthorizing(false);
        });
    } else {
      setAuthorizing(false);
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  const render = () => {
    if (props.redirected) {
      if (!authorizing && authorized) {
        return <Component {...props} />;
      }
      if (!authorizing && !authorized) {
        return <Redirect to="/welcome" />;
      }
    }
    return null;
  };

  return render();
};

export default withAuth;
