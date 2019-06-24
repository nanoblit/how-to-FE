import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

const Guides = ({ guides, fetchGuides }) => {
  useEffect(() => {
    fetchGuides();
  }, []);

  return (
    <div>
      {guides.map(({ id, title, username }) => (
        <div key={id}>
          <Link to={`guide/${id}`}>
            Title: {title} by {username}
          </Link>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({ guides: state.guides });

export default connect(
  mapStateToProps,
  { fetchGuides: actions.fetchGuides },
)(Guides);
