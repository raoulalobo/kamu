import { Meteor } from 'meteor/meteor';

import '../imports/api/transactions';
import '../imports/api/prestations';
import '../imports/api/users';
import '../imports/api/hospitalisations';
import '../imports/api/societes';
import '../imports/api/stocks';
import '../imports/api/soins';
import '../imports/api/tarifs';
import '../imports/api/polices';
import '../imports/api/tickets';
import '../imports/api/droits';
import '../imports/api/patients';
import '../imports/api/lits';
import '../imports/api/rdvs';
import '../imports/api/typeprestations';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
    // code to run on server at startup

    if ( Meteor.users.find().count() === 0 ) {

        console.log(`Creation d'un user`);

        const identifiant = Accounts.createUser({
            email: "nathanaelalobo@gmail.com",
            password: "admin",
            profile: {username: 'radd'},
            profile: {name: 'raoulalobo'},
            roles: ['admin']
        });

        Roles.setUserRoles(identifiant,'admin');
    }
});
