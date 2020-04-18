import React,{useState, useContext} from 'react';
import {signInWithEmail} from '../sign-in-methods/emailSignIn';
import {signOutEmail} from '../sign-in-methods/emailSignIn';
//import {UserContext} from '../../App'
import { withRouter } from "react-router-dom";

// const userValueContext = useContext(UserContext);
// console.log(userValueContext);

 const EmailAuth = (props) => {
     const [emails, setEmails] = useState('');
     const [password, setPassword] = useState('');
    return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        signInWithEmail(emails,password);
        setEmails("");
        setPassword("");
        props.history.push('/shifts');
      }} >
        <input type="email" onChange={e => setEmails(e.target.value)}/>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
        <button className="auth-button">Login</button>
        </form>   
        <button className="auth-button" onClick={() => signOutEmail()}>Logout</button>
    </div>
  );
}

export default withRouter(EmailAuth);

