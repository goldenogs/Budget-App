import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider).then(() => {
            console.log(firebase.auth().currentUser.email);
            database.ref(`emails`).push(firebase.auth().currentUser.email);
        });
    }
}

export const startLogout = () => {
    
    return () => {
        return firebase.auth().signOut();
    }
}

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})


export const logout = () => ({
    type: 'LOGOUT',
})