import React, { Component }  from 'react';
import { Grid , Header, Icon , Input, Label, Menu } from 'semantic-ui-react'

import MainMenu from './MainMenu';


export default class FicheMedicales extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <MainMenu/>

                <div className='mgnTopMainGrid'>

                </div>

                <div className='ourDropdown'>
                    <Grid  divided>
                        <Grid.Row>
                            <Header as='h2'>
                                <Icon circular name='treatment' />
                                <Header.Content>
                                    Enregistrement des ficheMedicales
                                    <Header.Subheader>
                                        Note du KAMU : Apres insertion il sera impossible de supprimer !
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Menu vertical>

                                    <Menu.Item name='inbox'>
                                        <Label color='teal'>1</Label>
                                        Fiches
                                    </Menu.Item>

                                    <Menu.Item name='spam'>
                                        <Label>51</Label>
                                        Ordonnances
                                    </Menu.Item>

                                    <Menu.Item name='updates'>
                                        <Label>1</Label>
                                        Soins
                                    </Menu.Item>

                                    <Menu.Item>
                                        <Input icon='search' placeholder='Search mail...' />
                                    </Menu.Item>

                                </Menu>
                            </Grid.Column>
                            <Grid.Column width={13}>
                                <Grid.Row>
                                    Rechercher un ficheMedicale {/*<DepartSearch/>*/}
                                </Grid.Row>

                                <h2></h2>
                                Rechercher un ficheMedicale {/*<DepartSearch/>*/}

                                <Grid.Row>
                                    Chiffre sur les ficheMedicales {/*<FicheMedicalesHelpBar/>*/}
                                </Grid.Row>

                                <Grid.Row>
                                    <h2></h2>
                                    <div className="tableOverflow">
                                        Liste de ficheMedicales {/*<FicheMedicalesList/>*/}
                                    </div>
                                </Grid.Row>

                            </Grid.Column>

                        </Grid.Row>

                    </Grid>
                </div>

                <div className='mgnBotMainGrid'>

                </div>

            </div>
        )
    }

};
