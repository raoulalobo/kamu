import React, { Component } from 'react';
import UsrsList from "./UsrsList";
import PolicesList from "./PolicesList";
import PatientsList from "./PatientsList";
import TarifsList from "./TarifsList";

class ComposantsList extends Component {
    components = {
        usr: UsrsList,
        polices: PolicesList,
        tarifs: TarifsList,
    };
    render() {
        const TagName = this.components[this.props.tag || 'usr'];
        return <TagName />
    }
}
export default ComposantsList;