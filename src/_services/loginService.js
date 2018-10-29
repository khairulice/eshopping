//import config from 'config';
import firebase from "firebase";

export const loginService = {
    login,
    logout,
    signup
};


function login(username, password) {

    var promise1 = new Promise(function (resolve, reject) {
        firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error.message);
            return reject(error.message);
        });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log("Logged in successful11111");
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                localStorage.setItem('user', JSON.stringify(user));
                return resolve({email:user.email});
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });
    });
    return promise1
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function signup(email, password) {

    var promise1 = new Promise(function (resolve, reject) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user=>{
        resolve({email:email});
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(error.message);
        return reject(error.message);
    });

});
       
    return promise1
}

