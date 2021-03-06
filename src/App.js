import React from 'react';
import { Route } from 'react-router';
import { Grommet, Box } from 'grommet';

import withAuth from './components/withAuth';
import withCreator from './components/withCreator';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Guides from './components/Guides';
import Guide from './components/Guide';
import CreateGuide from './components/CreateGuide';
import GlobalStyles from './styles/GlobalStyles';

/*
What pages do we need?
+  - HOC requiring the token, redirects to /welcome
++ - HOC requiring the token and user who is a creator. Renders something
     like "You need to be the creator" and gives "okay" button that links
     to /welcome

- /welcome "Hey sign up or login" page user is redirected to if is not
  logged in (checked using a HOC on every component that requires data from
  server, it tries to get /users:id of the user from localstorage (if it's
  in there, if it isn't there or server returns an error, user is
  redirected))
- /signup Sign up page (Username, Password, Account type)
  - success and fail state for the message
- /login Login page
  - success and fail state for the message

- +/ A page with all the guides
  - Each guide dsplayed as a box with guide title, user title and youtube
  thumbnail in the background if given, edit and delete buttons if created
  by this user
  - A search bar searching by title or user name (buttons: Title, Username)
  - "Create guide" button if logged in as creator
- ++/createGuide Create guide page with name, category, Step 1, button to
  add/remove steps, option to add video link.
- +/guide/:id Guide page with
  - The title,
  - Created by,
  - Edit button (if logged in as the creator)
  - Delete button (if logged in as the creator)
  - type
  - Description,
  - The video (if on YouTube) or link to the video or no link at all,
  - All the steps
- ++/guide/:id/edit Edit guide page with:
  - title,
  - delete button,
  - type,
  - description,
  - video link,
  - steps,
  - add step, remove step buttons
  - Save button

=== REGISTER AND LOGIN STATES IN THEIR COMPONENTS, OTHER COMPONENTS DON'T
NEED IT ===
Action types:
  - SET_GUIDES
  - LOADING
Actions:
  - fetchGuides - fetches guides and returns SET_GUIDES with the guides. Starts
  and finishes loading.
  - setLoading - returns LOADING with true or false
Rducers:
  - guidesReducer (state = []):
    SET_GUIDES - sets the guides with payload
  - loadingReducer (state = false):
    LOADING - sets loading to payload
*/

const AuthedGuides = withAuth(Guides);
const AuthedGuide = withAuth(Guide);
const AuthedCreateGuide = withCreator(withAuth(CreateGuide));
const AuthedEditGuide = withCreator(withAuth(CreateGuide));

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const App = () => (
  <Grommet theme={theme}>
    <GlobalStyles />
    <Box
      size={{ width: { max: 'xsmall' } }}
      background="
      light-2"
      pad={{ left: 'medium', right: 'medium', vertical: 'small' }}
      elevation="medium"
      style={{ zIndex: '1', maxWidth: '700px', margin: '0 auto' }}
    >
      <Route path="/welcome" component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" exact render={props => <AuthedGuides {...props} redirected />} />
      <Route path="/guide/:id" exact render={props => <AuthedGuide {...props} redirected />} />
      <Route path="/guide/:id/edit" component={AuthedEditGuide} />
      <Route path="/createGuide" component={AuthedCreateGuide} />
    </Box>
  </Grommet>
);

export default App;
