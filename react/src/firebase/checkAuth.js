import {auth} from './firebase'

export const postTokenToBackend = async () => {
    const token = await auth().currentUser.getIdToken();
    console.log(token);

    const result = await fetch('http://localhost:5000/auth', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Sowmya ${token}`
        },
        method: 'POST'
    })
    console.log(result.json());
    return 'Posted token to backend'
}

