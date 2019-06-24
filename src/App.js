import React from 'react';
import { Route } from 'react-router';

import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';

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

const App = () => (
  <div>
    <Route path="/welcome" component={Welcome} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </div>
);

export default App;
