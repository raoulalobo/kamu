import React, { Component }  from 'react';
import { Grid , Header, Icon  } from 'semantic-ui-react'

import MainMenu from './MainMenu';
import TicketsAdd from './TicketsAdd';
import TicketsList from './TicketsList';
//import TicketsHelpBar from './TicketsHelpBar';


export default class Tickets extends React.Component{
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
                            <Icon circular name='ticket' />
                            <Header.Content>
                                Enregistrement des tickets
                                <Header.Subheader>
                                    Note du KAMU : Apres insertion il sera impossible de supprimer !
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Row>

                    <Grid.Row>

                        <Grid.Column width={16}>
                            <Grid.Row>
                                <TicketsAdd/>
                            </Grid.Row>

                            <h2></h2>
                            Rechercher un ticket {/*<DepartSearch/>*/}

                            <Grid.Row>
                                Chiffre sur les tickets {/*<TicketsHelpBar/>*/}
                            </Grid.Row>

                            <Grid.Row>
                                <h2></h2>
                                <div className="tableOverflow">
                                    <TicketsList/>
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
