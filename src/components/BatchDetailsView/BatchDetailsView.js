import React from 'react';
import { Link } from 'react-router-dom';
import DetailsForm from './DetailsForm';
import { Button, Icon } from 'semantic-ui-react'


export default class BatchDetailsView extends React.Component {

    // metoda, która powoduje powrót do poprzedniego path z history - tu nie moge jej wykorzystać, bo poprzednim path mogą być twż inne zakładki z formularza dodawania, a musze cofnąć do głównej strony
    // goBack = () => {
    //     this.props.history.goBack();
    // };

    render() {
        const batchKey = this.props.match.params.batchKey;
        const batches = this.props.batches;
        const batch = batches.filter(batch => batch.key === batchKey);
        console.log(batch);
        const batchObj = batch[0];

        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{height: '100vh', width:'100vw', backgroundColor: '#333333', opacity: '0.75', position: 'fixed', left: '0', top: '0', zIndex: '998'}}>
                </div>
                <div style={{width:'90vw', backgroundColor: 'white', zIndex: '999', opacity: '100', position: 'absolute', top: '3em', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3em 0'}}>
                    <DetailsForm batch={batchObj}/>
                    <Link to={this.props.pathToGoBack}>
                        <Button icon style={{position: 'absolute', top: '1em', right: '2em'}}>
                            <Icon name='window close' />
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
};



