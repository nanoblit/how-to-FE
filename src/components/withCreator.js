import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const withCreator = Component => props => {
  const [authorizing, setAuthorizing] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const authorize = () => {
    if (localStorage.getItem('type') === 'creator') {
      if (props.match.params.id) {
        if (props.match.params.id === localStorage.getItem('id')) {
          setAuthorizing(false);
          setAuthorized(true);
        } else {
          setAuthorizing(false);
        }
      } else {
        setAuthorizing(false);
        setAuthorized(true);
      }
    } else {
      setAuthorizing(false);
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  const render = () => {
    if (!authorizing && authorized) {
      return <Component {...props} />;
    }
    if (!authorizing && !authorized) {
      return (
        <div>
          You have no access to this page <Link to="/">Go home</Link>
        </div>
      );
    }
    return null;
  };

  return render();
};

export default withCreator;
