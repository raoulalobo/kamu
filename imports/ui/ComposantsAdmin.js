import React, { Component } from 'react';
import UsrAdd from "./UsrAdd";
import PolicesAdd from "./PolicesAdd";
import TarifsAdd from "./TarifsAdd";
import StocksAdd from "./StocksAdd";
import SocietesAdd from "./SocietesAdd";
import TransactionsAdd from "./TransactionsAdd";
import SoinsAdd from "./SoinsAdd";
import RdvsAdd from "./RdvsAdd";

class ComposantsAdmin extends Component {
    components = {
        usr: UsrAdd,
        polices: PolicesAdd,
        tarifs: TarifsAdd,
        stocks: StocksAdd,
        societes: SocietesAdd,
        transactions: TransactionsAdd,
        soins: SoinsAdd,
        rdvs: RdvsAdd,
    };
    render() {
        const TagName = this.components[this.props.tag || 'usr'];
        return <TagName />
    }
}
export default ComposantsAdmin;