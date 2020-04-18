import React, {createContext, useState, useEffect} from 'react';
import Shifts from './components/pages/ShiftForm';
import ShiftOverview from './components/pages/ShiftOverview';
import {auth} from '../src/firebase/firebase';
import {postTokenToBackend} from '../src/firebase/checkAuth';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EmailAuth from './components/pages/EmailAuth';
import GoogleAuth from './components/pages/GoogleAuth';
const UserContext = createContext(null);

function App () {

   const [userState, setUserState] = useState(null);

    useEffect(() => {
      auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(user);
          setUserState(user)
        } else {
          setUserState(null)
        }
      }); 
    }, []);
    console.log(userState);


  //   auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //         console.log(user); // It shows the Firebase user
  //         console.log(auth().user); // It is still undefined
  //         user.getIdToken().then(function(idToken) {  // <------ Check this line
  //            console.log(idToken); // It shows the Firebase token now
  //         });
  //     }
  // });
      return (
    <Router>
      <UserContext.Provider value={userState}>
        <Switch>
          <Route path="/shifts">
            <Shifts />
          </Route>
          <Route path="/shiftOverview">
            <ShiftOverview />
          </Route>
          <Route path="/" exact>
            <EmailAuth />
            <GoogleAuth />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  )
}

export default App;
export {UserContext};


