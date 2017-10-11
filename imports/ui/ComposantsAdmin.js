import React, { Component } from 'react';
import UsrAdd from "./UsrAdd";
import PolicesAdd from "./PolicesAdd";
import DroitsAdd from "./DroitsAdd";

class ComposantsAdmin extends Component {
    components = {
        ursadd: UsrAdd,
        policesadd: PolicesAdd,
        droitsadd: DroitsAdd,
    };
    render() {
        const TagName = this.components[this.props.tag || 'droitsadd'];
        return <TagName />
    }
}
export default ComposantsAdmin;