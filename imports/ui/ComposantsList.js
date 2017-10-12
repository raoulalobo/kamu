import React, { Component } from 'react';
import UsrsList from "./UsrsList";
import PolicesList from "./PolicesList";
import PatientsList from "./PatientsList";

class ComposantsList extends Component {
    components = {
        usr: UsrsList,
        patients: PatientsList,
        polices: PolicesList,
    };
    render() {
        const TagName = this.components[this.props.tag || 'usr'];
        return <TagName />
    }
}
export default ComposantsList;