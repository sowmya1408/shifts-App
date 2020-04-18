import {auth} from '../../firebase/firebase';

export const signInWithEmail = async (email, password) => {
    try{
       const results =  await auth().signInWithEmailAndPassword(email, password)
       console.log(results);
       //const idToken = results.credential.idToken;
       const cred = auth.EmailAuthProvider.credential(
        email,
        password
        
    );
           console.log(cred);

    //    const userToken = auth().getIdTokenResult;
    //    console.log(userToken);
    } catch(err){
        console.log(err);
    }
}

export const signOutEmail = async ()=> {
    await auth().signOut()
    console.log('Signed out')
}