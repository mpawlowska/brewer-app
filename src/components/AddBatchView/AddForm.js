import React from 'react';


export default class AddForm extends React.Component {
    render() {
        return (
            <div style={{height: '80vh', width:'70vw', backgroundColor: 'white', zIndex: '999', opacity: '100', position: 'fixed', top: '5.5em'}}>
            </div>
        )
    }
}




// Getting a reference to the database service
const database = firebase.database();

/*
 function writeUserData(userId, name, email, imageUrl) {
 firebase.database().ref('users/' + userId).set({
 username: name,
 email: email,
 profile_picture : imageUrl
 });
 }
 */
