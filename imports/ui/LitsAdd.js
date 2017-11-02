import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message } from 'semantic-ui-react'

export class LitsAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            libelle: '',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { libelle, observations } = this.state;

        e.preventDefault();

        if ( libelle && observations  ) {

            Meteor.call('lits.insert', libelle , observations , (err, res) => {
                if (!err) {
                    this.handleClose();
                    Bert.alert( `enregistrement ${res} ajoute avec succes.`, 'danger', 'growl-top-right', 'fa-check'  )
                } else {
                    this.setState({ error: err.reason });
                }
            });

        } else {
            this.setState({ error: 'All field are required' });
        }
    }
    handleClose() {
        this.setState({
            modalOpen: false,
            libelle: '',
            observations: '',
            error: ''
        });
    }
    handleOpen() {
        this.setState( { modalOpen: true } );
    }
    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });

    }
    componentWillReceiveProps(nextProps) {

        console.log(this.props);
        console.log(nextProps)

    }
    componentWillUnmount() {

    }
    render() {

        return (

            <Modal
                closeIcon
                closeOnRootNodeClick={false}
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01 lit</Button>}>
                <Modal.Header>Ajouter 01 lit</Modal.Header>
                <Modal.Content >
                    {this.state.error ?
                        <Message negative>
                            <Message.Header>Desole , nous ne pouvons effectuer cet enregistrement</Message.Header>
                            <p>{this.state.error}</p>
                        </Message>
                        :
                        undefined}
                    <Form>

                        <Form.Group widths='equal'>
                            <Form.Input label='Libelle'
                                        name='libelle'
                                        value={this.state.libelle}
                                        onChange={this.onChangeField.bind(this)}/>
                        </Form.Group>

                        <Form.TextArea label='Observations'
                                       name='observations'
                                       id='autre'
                                       value={this.state.observations}
                                       onChange={this.onChangeField.bind(this)}/>
                        <Form.Button fluid basic color='blue'>Creer un lit</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

LitsAdd.propTypes = {

};

export default createContainer(() => {

    return {

    };
}, LitsAdd );
