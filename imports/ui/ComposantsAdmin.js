import React, { Component } from 'react';
import UsrAdd from "./UsrAdd";
import PolicesAdd from "./PolicesAdd";

class ComposantsAdmin extends Component {
    components = {
        usr: UsrAdd,
        polices: PolicesAdd
    };
    render() {
        const TagName = this.components[this.props.tag || 'usr'];
        return <TagName />
    }
}
export default ComposantsAdmin;