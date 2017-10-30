import React, { Component }  from 'react';
import { Grid , Header, Icon , Input, Label, Menu } from 'semantic-ui-react'

import MainMenu from './MainMenu';
import FicheMedicalAdd from './FicheMedicalAdd';


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
                                        Fiches
                                    </Menu.Item>

                                    <Menu.Item name='spam'>
                                        Soins
                                    </Menu.Item>

                                    <Menu.Item name='spam'>
                                        Imagerie
                                    </Menu.Item>

                                    <Menu.Item name='spam'>
                                        Labos
                                    </Menu.Item>

                                    <Menu.Item name='spam'>
                                        Rendez-vous
                                    </Menu.Item>

                                    <Menu.Item name='spam'>
                                        Intervention autre medecin
                                    </Menu.Item>

                                    <Menu.Item name='updates'>
                                        Evasan
                                    </Menu.Item>

                                    <Menu.Item name='updates'>
                                        Autres menus ...
                                    </Menu.Item>

                                </Menu>
                            </Grid.Column>
                            <Grid.Column width={13}>
                                <Grid.Row>
                                    <FicheMedicalAdd/>
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
