import React from 'react';
import AddForm from './AddForm';
import { Button, Icon } from 'semantic-ui-react'


export default class AddBatchView extends React.Component {
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{height: '100vh', width:'100vw', backgroundColor: '#333333', opacity: '0.75', position: 'fixed', left: '0', top: '0', zIndex: '998'}}>
                </div>
                <div style={{width:'90vw', backgroundColor: 'white', zIndex: '999', opacity: '100', position: 'absolute', top: '3em', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3em 0'}}>
                    <AddForm/>
                    <Button icon style={{position: 'absolute', top: '1em', right: '2em'}}>
                        <Icon name='window close' />
                    </Button>
                </div>
            </div>
        )
    }
}

// css info - aby zrobić non-opacity element na elemencie, który ma ustawione opacity, nie mogę umieścić tego elementu non-opacity jako dziecka, bo wtedy będzie zawsze 'dziedziczyło' opacity. Wyrzucam więc ten element jako sąsiada elementu z opacity i odpowiednio go pozycjonuję;
