import React from 'react';
import AddForm from './AddForm'


export default class AddBatchView extends React.Component {
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{height: '100vh', width:'100vw', backgroundColor: '#333333', opacity: '0.75', position: 'fixed', left: '0', top: '0', zIndex: '998'}}>
                </div>
                <div style={{height: '80vh', width:'90vw', backgroundColor: 'white', zIndex: '999', opacity: '100', position: 'fixed', top: '5.5em', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <AddForm/>
                </div>
            </div>
        )
    }
}

// css info - aby zrobić non-opacity element na elemencie, który ma ustawione opacity, nie mogę umieścić tego elementu non-opacity jako dziecka, bo wtedy będzie zawsze 'dziedziczyło' opacity. Wyrzucam więc ten element jako sąsiada elementu z opacity i odpowiednio go pozycjonuję;
