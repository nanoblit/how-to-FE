import React, { useState, useEffect } from 'react';
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

// Add loading and showing errors
// Might need a fetch after adding and updating guide

const CreateGuideDiv = styled.div`
  .topButtons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    a {
      margin-right: 20px;
    }
  }
  .formDiv {
    display: block;
    text-align: center;

    form {
      display: inline-block;
      margin-left: auto;
      margin-right: auto;
      text-align: left;
      width: 100%;
      max-width: 400px;

      input,
      textarea {
        max-width: 400px;
        margin-bottom: 20px;
      }

      .stepsButtons {
        display: flex;

        button:first-of-type {
          margin-right: 10px;
        }
      }

      button {
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }
`;

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
    <CreateGuideDiv>
      <div className="topButtons">
        <Link to="/">
          <Button label="Back" />
        </Link>
        {match.params.id && (
          <Button type="button" onClick={deleteGuide} label="Delete" color="status-critical" />
        )}
      </div>
      <div className="formDiv">
        <form onSubmit={handleGuideSubmit}>
          Title
          <TextInput ref={titleRef} id="title" required />
          Category
          <TextInput ref={categoryRef} id="category" required />
          Description
          <TextInput ref={descriptionRef} id="description" required />
          Link
          <TextInput ref={linkRef} id="link" required />
          {steps.map((step, idx) => (
            <>
              Step {idx + 1}
              <div>
                <TextArea value={step} onChange={e => handleStepChange(e, idx)} required />
              </div>
            </>
          ))}
          <div className="stepsButtons">
            <Button type="button" onClick={handleMoreSteps} label="More steps" />
            <Button type="button" onClick={handleLessSteps} label="Less steps" />
          </div>
          <Button type="submit" label="Save guide" />
        </form>
      </div>
    </CreateGuideDiv>
  );
};

const mapStateToProps = state => ({ guides: state.guides });

export default connect(
  mapStateToProps,
  { fetchGuides: actions.fetchGuides },
)(CreateGuide);
