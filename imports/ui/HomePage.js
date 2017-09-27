import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Grid , Header, Icon } from 'semantic-ui-react'

import MainMenu from "./MainMenu";


export class HomePage extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            currentUser : Meteor.user()
        }
    }
    componentWillReceiveProps(nextProps) {
        const { user } = nextProps;
        if (user) {
            this.setState({currentUser: user._id});
        }
    }
    adminLevel() {
        if ( 1===1 ) {
            return (
                <div>

                    <MainMenu/>
                    <div className='mgnTopMainGrid'>

                    </div>
                    <Grid container divided>
                        <Grid.Row>
                            <Header as='h2'>
                                <Icon circular name='home' />
                                <Header.Content>
                                    Ceci sera la HomePage ... Ne touchez pas svp , je vous vois .
                                    <Header.Subheader>
                                        Bienvenus au KAMU .
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Row>

                    </Grid>
                    <div className='mgnBotMainGrid'>

                    </div>

                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {this.adminLevel()}
            </div>
        );
    }

};


export default createContainer(() => {
    const user = Meteor.user() || undefined ;
    return {

    };
}, HomePage);