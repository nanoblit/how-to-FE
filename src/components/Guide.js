import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

// Change it so it fetches only it's own guide

const Guide = ({ guides, match, fetchGuides }) => {
  const guide = guides.find(({ id }) => id === Number(match.params.id));

  useEffect(() => {
    if (guides.length === 0) {
      fetchGuides();
    }
  }, []);

  const convertStepsToArray = thing => {
    const steps = [];
    for (let i = 1; i <= 5; i++) {
      steps.push(thing[`step_${i}`]);
    }

    return steps;
  };

  let steps;
  if (guide) steps = convertStepsToArray(guide);

  return guide ? (
    <div>
      <Link to="/">Back</Link>
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
    </div>
  ) : null;
};

const mapStateToProps = state => ({ guides: state.guides });

export default connect(
  mapStateToProps,
  { fetchGuides: actions.fetchGuides },
)(Guide);
