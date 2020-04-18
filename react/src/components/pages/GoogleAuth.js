import React from 'react';
import signInWithGoogle from '../sign-in-methods/sigInWithGoogle'

function GoogleAuth() {

    return (
    <div>
    <button onClick={signInWithGoogle}>SignIn with google</button>
    </div>
        ) 
}

export default GoogleAuth
