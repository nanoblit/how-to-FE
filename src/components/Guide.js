import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button,
  Heading,
  FormField,
  TextInput,
  Select,
  RadioButton,
  Text,
  TextArea,
} from 'grommet';

import authedAxios from '../misc/authedAxios';
import * as actions from '../actions';

// Change it so it fetches only it's own guide

const GuideDiv = styled.div`
  .topButtons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    a {
      margin-right: 20px;
    }
  }
`;

const Guide = ({
  guides, match, history, fetchGuides,
}) => {
  const guide = guides.find(({ id }) => id === Number(match.params.id));

  useEffect(() => {
    if (guides.length === 0) {
      fetchGuides();
    }
  }, []);

  const deleteGuide = id => {
    authedAxios()
      .delete(`https://bw-how-to.herokuapp.com/guides/${id}`)
      .then(() => {
        history.push('/');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const convertStepsToArray = thing => {
    const steps = [];
    for (let i = 1; i <= 5; i++) {
      steps.push(thing[`step_${i}`]);
    }

    return steps;
  };

  const doesBelongToUser = () => {
    const thatGuide = guides.find(thisGuide => thisGuide.id === Number(match.params.id));
    return thatGuide.username === localStorage.getItem('username');
  };

  let steps;
  if (guide) steps = convertStepsToArray(guide);

  return guide ? (
    <GuideDiv>
      <div className="topButtons">
        <Link to="/">
          <Button label="Back" />
        </Link>
        {doesBelongToUser() && (
          <>
            <Link to={`/guide/${match.params.id}/edit`}>
              <Button label="Edit" />
            </Link>
            <Button
              type="button"
              onClick={() => deleteGuide(match.params.id)}
              label="Delete"
              color="status-critical"
            />
          </>
        )}
      </div>
      <h1>{guide.title}</h1>
      <p>by {guide.username}</p>
      <p>type: {guide.type}</p>
      <p>description: {guide.description}</p>
      <a href={guide.link}>{guide.link}</a>
      <ol>
        {steps.map(step => {
          if (step) return <li>{step}</li>;
          return null;
        })}
      </ol>
    </GuideDiv>
  ) : null;
};

const mapStateToProps = state => ({ guides: state.guides });

export default connect(
  mapStateToProps,
  { fetchGuides: actions.fetchGuides },
)(Guide);
