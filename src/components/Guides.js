import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import authedAxios from '../misc/authedAxios';
import * as actions from '../actions';

const Guides = ({ guides, fetchGuides, setGuides }) => {
  const [selectedRadio, setSelectedRadio] = useState('title');
  const searchRef = React.createRef();

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

  const handleSearchChange = () => {
    const searchText = searchRef.current.value;
    const searchedGuides = guides.map(g => {
      const curG = g;
      if (selectedRadio === 'title' && curG.title.indexOf(searchText) !== -1) {
        curG.displayed = true;
      } else if (selectedRadio === 'username' && curG.username.indexOf(searchText) !== -1) {
        curG.displayed = true;
      } else {
        curG.displayed = false;
      }
      return curG;
    });

    setGuides(searchedGuides);
  };

  const handleRadioChange = value => {
    setSelectedRadio(value);
    handleSearchChange();
  };

  return (
    <div>
      <div>
        <input onChange={handleSearchChange} ref={searchRef} placeholder="Search" />
        <input
          checked={selectedRadio === 'title'}
          onChange={() => handleRadioChange('title')}
          type="radio"
          name="searchType"
          value="title"
        />{' '}
        title
        <input
          checked={selectedRadio === 'username'}
          onChange={() => handleRadioChange('username')}
          type="radio"
          name="searchType"
          value="username"
        />{' '}
        username
      </div>
      {guides.map(
        ({
          id, title, username, displayed,
        }) => displayed && (
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
        ),
      )}
    </div>
  );
};

const mapStateToProps = state => ({ guides: state.guides });

export default connect(
  mapStateToProps,
  { fetchGuides: actions.fetchGuides, setGuides: actions.setGuides },
)(Guides);
