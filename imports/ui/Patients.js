import React, { Component }  from 'react';
import { Grid , Header, Icon  } from 'semantic-ui-react'

import MainMenu from './MainMenu';
import PatientsAdd from './PatientsAdd';
import PatientsList from './PatientsList';
//import DepartSearch from './DepartSearch';
//import PatientsHelpBar from './PatientsHelpBar';


export default class Patients extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div>
                <MainMenu/>
                <div className='mgnTopMainGrid'>

                </div>
                <Grid container divided>
                    <Grid.Row>
                        <Header as='h2'>
                            <Icon circular name='users' />
                            <Header.Content>
                                Enregistrement des patients
                                <Header.Subheader>
                                    Note du KAMU : Apres insertion il sera impossible de supprimer !
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Row>

                    <Grid.Row>

                        <Grid.Column width={16}>
                            <Grid.Row>
                                <PatientsAdd/>
                            </Grid.Row>

                            <h2></h2>
                            Rechercher un patient {/*<DepartSearch/>*/}

                            <Grid.Row>
                                Chiffre sur les patients {/*<PatientsHelpBar/>*/}
                            </Grid.Row>

                            <Grid.Row>
                                <h2></h2>
                                <div className="tableOverflow">
                                    <PatientsList/>
                                </div>
                            </Grid.Row>

                        </Grid.Column>

                    </Grid.Row>

                </Grid>
                <div className='mgnBotMainGrid'>

                </div>
            </div>
        )
    }

};
