import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import authedAxios from '../misc/authedAxios';
import * as actions from '../actions';

// Add loading and showing errors
// Might need a fetch after adding and updating guide

const CreateGuide = ({
  match, history, guides, fetchGuides,
}) => {
  const [steps, setSteps] = useState(['']);
  const titleRef = React.createRef();
  const categoryRef = React.createRef();
  const descriptionRef = React.createRef();
  const linkRef = React.createRef();

  const deleteGuide = () => {
    authedAxios()
      .delete(`http://localhost:8000/guides/${match.params.id}`)
      .then(() => {
        history.push('/');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

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
    const { id } = match.params;
    console.log(data);
    authedAxios()
      [id ? 'put' : 'post'](`http://localhost:8000/guides/${id || ''}`, data)
      .then(res => {
        console.log(res.data);
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
      link: linkRef.current.value,
      user_id: Number(localStorage.getItem('id')),
    };

    steps.forEach((step, idx) => {
      toSend[`step_${idx + 1}`] = step;
    });
    sendGuide(toSend);
    history.push('/');
  };

  useEffect(() => {
    if (match.params.id && guides.length !== 0) {
      const guide = guides.find(({ id }) => id === Number(match.params.id));
      titleRef.current.value = guide.title;
      categoryRef.current.value = guide.type;
      descriptionRef.current.value = guide.description;
      linkRef.current.value = guide.link;

      let newSteps = [];
      for (let i = 1; i < 6; i++) {
        const step = guide[`step_${i}`];
        if (!step) break;
        newSteps = [...newSteps, step];
      }
      setSteps(newSteps);
    }
  }, [guides]);

  return (
    <div>
      <Link to="/">Back</Link>
      {match.params.id && (
        <button type="button" onClick={deleteGuide}>
          Delete
        </button>
      )}
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
    </div>
  );
};

const mapStateToProps = state => ({ guides: state.guides });

export default connect(
  mapStateToProps,
  { fetchGuides: actions.fetchGuides },
)(CreateGuide);
