import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';

const Login = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    
    const handleGoogleSignIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            
            const {displayName,email} = result.user;
            const signedInUser = {name : displayName, email : email}
            setLoggedInUser(signedInUser);
          }).catch(function(error) {           
            var errorCode = error.code;
            var errorMessage = error.message;           
            var email = error.email;          
            var credential = error.credential;
           
          });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign -Id</button>
        </div>
    );
};

export default Login;