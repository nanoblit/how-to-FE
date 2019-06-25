import React, { useState } from 'react';
import { connect } from 'react-redux';

import authedAxios from '../misc/authedAxios';
import * as actions from '../actions';

// Add loading and showing errors

const CreateGuide = ({ match }) => {
  const [steps, setSteps] = useState(['']);
  const titleRef = React.createRef();
  const categoryRef = React.createRef();
  const descriptionRef = React.createRef();
  const linkRef = React.createRef();

  const handleStepChange = (e, idx) => {
    const newSteps = steps.map((step, i) => (i === idx ? e.target.value : step));
    setSteps(newSteps);
  };

  const handleMoreSteps = () => {
    if (steps.length < 5) setSteps([...steps, '']);
  };

  const handleLessSteps = () => {
    if (steps.length > 1) {
      steps.pop();
      setSteps([...steps]);
    }
  };

  const sendGuide = data => {
    authedAxios()
      // eslint-disable-next-line no-unexpected-multiline
      [match.params.id ? 'post' : 'put']('http://localhost:8000/guides', data)
      .then(() => {
        console.log('added!');
      })
      .catch(error => console.log(error.message));
  };

  const handleGuideSubmit = e => {
    e.preventDefault();

    const toSend = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      type: categoryRef.current.value,
      user_id: Number(localStorage.getItem('id')),
    };

    steps.forEach((step, idx) => {
      toSend[`step_${idx + 1}`] = step;
    });
    console.log(toSend);
    sendGuide(toSend);
  };

  return (
    <form onSubmit={handleGuideSubmit}>
      <label htmlFor="title">
        Title
        <input ref={titleRef} id="title" required />
      </label>
      <label htmlFor="category">
        Category
        <input ref={categoryRef} id="category" required />
      </label>
      <label htmlFor="description">
        Description
        <input ref={descriptionRef} id="description" required />
      </label>
      <label htmlFor="link">
        Link
        <input ref={linkRef} id="link" />
      </label>
      {steps.map((step, idx) => (
        <label htmlFor={`step_${idx + 1}`}>
          Step {idx + 1}
          <input
            value={step}
            onChange={e => handleStepChange(e, idx)}
            id={`step_${idx + 1}`}
            required
          />
        </label>
      ))}
      <button type="button" onClick={handleMoreSteps}>
        More steps
      </button>
      <button type="button" onClick={handleLessSteps}>
        Less steps
      </button>
      <button type="submit">Save guide</button>
    </form>
  );
};

export default CreateGuide;
