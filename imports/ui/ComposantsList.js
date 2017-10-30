import React, { Component } from 'react';
import UsrsList from "./UsrsList";
import PolicesList from "./PolicesList";
import StocksList from "./StocksList";
import TarifsList from "./TarifsList";
import SocietesList from "./SocietesList";
import TransactionsList from "./TransactionsList";
import SoinsList from "./SoinsList";
import RdvsList from "./RdvsList";

class ComposantsList extends Component {
    components = {
        usr: UsrsList,
        polices: PolicesList,
        tarifs: TarifsList,
        stocks: StocksList,
        societes: SocietesList,
        transactions: TransactionsList,
        soins: SoinsList,
        rdvs: RdvsList,
    };
    render() {
        const TagName = this.components[this.props.tag || 'usr'];
        return <TagName />
    }
}
export default ComposantsList;