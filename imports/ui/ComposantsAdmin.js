import React, { Component } from 'react';
import UsrAdd from "./UsrAdd";
import PolicesAdd from "./PolicesAdd";
import TarifsAdd from "./TarifsAdd";
import StocksAdd from "./StocksAdd";
import SocietesAdd from "./SocietesAdd";
import TransactionsAdd from "./TransactionsAdd";
import SoinsAdd from "./SoinsAdd";
import RdvsAdd from "./RdvsAdd";
import LitsAdd from "./LitsAdd";
import FicheMedicalAdd from "./FicheMedicalAdd";

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
        lits: LitsAdd,
        fiches: FicheMedicalAdd
    };
    render() {
        const TagName = this.components[this.props.tag];
        return <TagName />
    }
}
export default ComposantsAdmin;
