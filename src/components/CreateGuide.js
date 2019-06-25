import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

// - ++/createGuide Create guide page with name, category, Step 1, button to
// add/remove steps, option to add video link.

const CreateGuide = () => {
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

  const handleGuideSubmit = e => {
    e.preventDefault();

    const toSend = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      type: categoryRef.current.value,
      user_id: localStorage.getItem('id'),
    };

    steps.forEach((step, idx) => {
      toSend[`step_${idx + 1}`] = step;
    });

    console.log(toSend);
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
