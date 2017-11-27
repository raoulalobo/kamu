import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Modal , Form, Message } from 'semantic-ui-react'
import { Societes } from '../api/societes';

export class PolicesAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            numeroPolice: '',
            societe: '',
            plafond: '',
            tauxCouverture: '',
            observations: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { numeroPolice, societe , plafond , tauxCouverture, observations } = this.state;

        e.preventDefault();

        if ( numeroPolice && societe && plafond && tauxCouverture && observations ) {

            Meteor.call('polices.insert', numeroPolice , societe ,parseInt( plafond.trim() )  , parseInt( tauxCouverture.trim() ) , observations , (err, res) => {
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
            numeroPolice: '',
            societe: '',
            plafond: '',
            tauxCouverture: '',
            observations: '',
            error: ''
        });
    }

    handleOpen() {
        this.setState( { modalOpen: true } );
    }

    onChangeField(e, { name,value }) {
        this.setState( { [name] : value });
        console.log(`${name} -> ${value}`)
    }
    componentWillReceiveProps(nextProps) {

        console.log(this.props);
        console.log(nextProps)

    }
    componentWillUnmount() {
        Meteor.subscribe('societes').stop();
    }
    render() {

        const optionsSocietes = this.props.societes;

        return (

            <Modal
                closeIcon
                closeOnRootNodeClick={false}
                onSubmit={this.onSubmit.bind(this)}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                dimmer='blurring'
                size='small'
                trigger={<Button onClick={this.handleOpen.bind(this)} primary size='mini'>+ Ajouter 01 police</Button>}>
                <Modal.Header>Ajouter 01 police</Modal.Header>
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

                            <Form.Input label='Numero de police'
                                        name='numeroPolice'
                                        value={this.state.numeroPolice}
                                        onChange={this.onChangeField.bind(this)}/>

                            <Form.Dropdown
                                label='Societe'
                                minCharacters={0}
                                name='societe'
                                placeholder='Selectionnez 01 societe'
                                search
                                selection
                                options={optionsSocietes}
                                onChange={this.onChangeField.bind(this)}/>

                        </Form.Group>

                        <Form.Group widths='equal'>

                            <Form.Input label='Plafond'
                                        name='plafond'
                                        value={this.state.plafond}
                                        onChange={this.onChangeField.bind(this)}/>

                            <Form.Input label='Taux de couverture'
                                        name='tauxCouverture'
                                        value={this.state.tauxCouverture}
                                        onChange={this.onChangeField.bind(this)}/>

                        </Form.Group>


                        <Form.TextArea label='Observations'
                                       name='observations'
                                       value={this.state.observations}
                                       onChange={this.onChangeField.bind(this)}/>

                        <Form.Button fluid basic color='blue'>Ajouter et creer un police</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

PolicesAdd.propTypes = {

};

export default createContainer(() => {

    const societesHandle = Meteor.subscribe('societes');
    const loading = !societesHandle.ready() ;

    return {
        Session,
        loading,
        societes : Societes.find({visible: true}).fetch().map((societe)=>{
            return {
                key: societe._id,
                text: societe.societe,
                value: societe.code
            }
        }),
    };

}, PolicesAdd );