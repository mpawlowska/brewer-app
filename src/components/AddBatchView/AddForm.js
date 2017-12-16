import React from 'react';
import NewBatchCard from './NewBatchCard';
import AddMenu from './Menu';


export default class AddForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            style: '',
            date: '',
            volume: '',
            ibu: '',
            srm: '',
            density: '',
            alcohol: '',
            type: ''
        }
    }

    handleDetailsChange = (name, value) => {
        this.setState({
            [name]: value
        })
    };

    render() {
        let { name, style, ibu, alcohol, volume, date } = this.state;
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '90%', width: '90%'}}>
                <NewBatchCard name={name} style={style} ibu={ibu} alcohol={alcohol} volume={volume} date={date}/>
                <AddMenu onDetailsChange={this.handleDetailsChange}/>
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
