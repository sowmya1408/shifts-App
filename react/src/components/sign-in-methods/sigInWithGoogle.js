import {auth} from '../../firebase/firebase'

const signInWithGoogle = () => {
    const googleAuthProvider = new auth.GoogleAuthProvider();
    auth().signInWithPopup(googleAuthProvider)
    .then((result)  => {
        // This gives you a Google Access Token.
       // const token = result.credential.accessToken;
        const idToken = result.credential.idToken;
        console.log(idToken);
        // The signed-in user info.
        const user = result.user;
        console.log(user);

    })
       .catch((err) => console.log(err))
}


export default signInWithGoogle;