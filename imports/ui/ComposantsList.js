import React, { Component } from 'react';
import UsrsList from "./UsrsList";
import PolicesList from "./PolicesList";
import StocksList from "./StocksList";
import TarifsList from "./TarifsList";
import SocietesList from "./SocietesList";

class ComposantsList extends Component {
    components = {
        usr: UsrsList,
        polices: PolicesList,
        tarifs: TarifsList,
        stocks: StocksList,
        societes: SocietesList,
    };
    render() {
        const TagName = this.components[this.props.tag || 'usr'];
        return <TagName />
    }
}
export default ComposantsList;