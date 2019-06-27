import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';

const withCreator = Component => props => {
  const [authorizing, setAuthorizing] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const authorize = () => {
    if (localStorage.getItem('type') === 'creator') {
      if (props.match.params.id) {
        const guide = props.guides.find(({ id }) => id === Number(props.match.params.id));
        if (!guide) {
          props.history.push('/');
        } else if (guide.username === localStorage.getItem('username')) {
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
    if (props.guides.length !== 0) {
      authorize();
    }
  });

  useEffect(() => {
    if (props.guides.length === 0) {
      props.fetchGuides();
    }
  }, []);

  const render = () => {
    if (!authorizing && authorized) {
      return <Component {...props} redirected />;
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

const mapStateToProps = state => ({ guides: state.guides });

export default compose(
  connect(
    mapStateToProps,
    { fetchGuides: actions.fetchGuides },
  ),
  withCreator,
);
