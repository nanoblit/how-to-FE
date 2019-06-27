import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button, Heading, FormField, TextInput, Select, RadioButton, Text,
} from 'grommet';

import authedAxios from '../misc/authedAxios';
import * as actions from '../actions';

const GuidesDiv = styled.div`
  > div,
  button {
    margin-bottom: 20px;
  }

  .searchNav {
    display: flex;
    align-items: center;

    input,
    div {
      max-width: 300px;
    }

    label {
      margin: 0 10px 0;
      flex-shrink: 0;
    }
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .card {
      position: relative;
      width: 45%;
      height: 200px;
      margin-bottom: 20px;
      background-color: #c2b5db;
      text-decoration: none;

      @media screen and (max-width: 400px) {
        width: 100%;
      }

      span {
        color: white;
      }

      .cardDiv {
        display: flex;
        justify-content: space-between;
        position: relative;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        div {
          background-color: red;
          align-self: end;
        }
      }
    }
  }
`;

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
    console.log(selectedRadio);
    const searchText = searchRef.current.value;
    const searchedGuides = guides.map(g => {
      const curG = g;
      if (selectedRadio === 'title' && curG.title.toLowerCase().indexOf(searchText) !== -1) {
        curG.displayed = true;
      } else if (
        selectedRadio === 'username'
        && curG.username.toLowerCase().indexOf(searchText) !== -1
      ) {
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
  };

  useEffect(() => {
    handleSearchChange();
  }, [selectedRadio]);

  return (
    <GuidesDiv>
      <div className="searchNav">
        <TextInput onChange={handleSearchChange} ref={searchRef} placeholder="Search" />
        <RadioButton
          checked={selectedRadio === 'title'}
          onChange={() => handleRadioChange('title')}
          type="radio"
          name="searchType"
          value="title"
          label="title"
        />
        <RadioButton
          checked={selectedRadio === 'username'}
          onChange={() => handleRadioChange('username')}
          type="radio"
          name="searchType"
          value="username"
          label="username"
        />
      </div>
      {localStorage.getItem('type') === 'creator' && (
        <Link to="/createGuide">
          <Button label="Create guide" />
        </Link>
      )}
      <div className="cards">
        {guides.map(
          ({
            id, title, username, displayed,
          }) => displayed && (
          <Link key={id} className="card" to={`guide/${id}`}>
            <div className="cardDiv">
              <Text>
                {title}
                <br /> by {username}
              </Text>
              {doesBelongToUser(id) && (
              <div>
                <Link to={`guide/${id}/edit`}>Edit</Link>
                <button type="button" onClick={() => deleteGuide(id)}>
                        Delete
                </button>
              </div>
              )}
            </div>
          </Link>
          ),
        )}
      </div>
    </GuidesDiv>
  );
};

const mapStateToProps = state => ({ guides: state.guides });

export default connect(
  mapStateToProps,
  { fetchGuides: actions.fetchGuides, setGuides: actions.setGuides },
)(Guides);
