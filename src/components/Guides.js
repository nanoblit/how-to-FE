import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import authedAxios from '../misc/authedAxios';
import * as actions from '../actions';

const Guides = ({ guides, fetchGuides }) => {
  useEffect(() => {
    fetchGuides();
  }, []);

  const deleteGuide = id => {
    authedAxios()
      .delete(`http://localhost:8000/guides/${id}`)
      .then(() => {
        fetchGuides();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const doesBelongToUser = id => {
    const guide = guides.find(thisGuide => thisGuide.id === id);
    return guide.username === localStorage.getItem('username');
  };

  return (
    <div>
      {guides.map(({ id, title, username }) => (
        <div key={id}>
          <Link to={`guide/${id}`}>
            Title: {title} by {username}
          </Link>
          {doesBelongToUser(id) && (
            <div>
              <Link to={`guide/${id}/edit`}>Edit</Link>
              <button type="button" onClick={() => deleteGuide(id)}>
                Delete
              </button>
            </div>
          )}
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
