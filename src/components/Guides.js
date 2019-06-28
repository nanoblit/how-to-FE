import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button, Heading, FormField, TextInput, Select, RadioButton, Text, Box,
} from 'grommet';
import youtubeThumbnail from 'youtube-thumbnail';

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
      display: block;
      width: 45%;
      height: 200px;
      margin-bottom: 60px;
      background-color: #c2b5db;

      @media screen and (max-width: 480px) {
        width: 100%;
      }

      span {
        color: white;
        text-decoration: none;
        margin-left: 5px;
        text-shadow: 2px 2px 11px #000000, 2px 2px 11px #000000, 2px 2px 11px #000000;
      }

      .cardDiv {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
      }
      .guideButtons {
        align-self: flex-end;
        margin-top: 5px;

        button {
          margin-left: 5px;
        }
      }
    }
  }
`;

const CardDiv = styled.div`
  ${({ thumbnail }) => (thumbnail ? `background-image: url("${thumbnail}");` : '')}
  background-size: cover;
  background-position: center; 
`;

const Guides = ({ guides, fetchGuides, setGuides }) => {
  const [selectedRadio, setSelectedRadio] = useState('title');
  const searchRef = React.createRef();

  useEffect(() => {
    fetchGuides();
  }, []);

  const deleteGuide = (e, id) => {
    e.stopPropagation();
    authedAxios()
      .delete(`https://bw-how-to.herokuapp.com/guides/${id}`)
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

  const getYoutubeThumbnail = link => {
    if (link && link.indexOf('youtube') !== -1) return youtubeThumbnail(link).default.url;
    return null;
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
            id, title, username, displayed, link,
          }) => displayed && (
          <Box key={id} className="card" elevation="medium">
            <Link to={`guide/${id}`}>
              <CardDiv thumbnail={getYoutubeThumbnail(link)} className="cardDiv">
                <Text>
                  {title}
                  <br /> by {username}
                </Text>
              </CardDiv>
            </Link>
            {doesBelongToUser(id) && (
            <div className="guideButtons">
              <Link to={`guide/${id}/edit`}>
                <Button label="Edit" />
              </Link>
              <Button
                type="button"
                onClickCapture={e => deleteGuide(e, id)}
                label="Delete"
                color="status-critical"
              />
            </div>
            )}
          </Box>
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
