import React from 'react';
import NewBatchCard from './NewBatchCard';
import AddMenu from './Menu';


export default class AddForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '90%', width: '90%'}}>
                <NewBatchCard />
                <AddMenu />
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
