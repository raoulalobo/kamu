import { Meteor } from 'meteor/meteor';

import '../imports/api/transactions';
import '../imports/api/users';
import '../imports/api/societes';
import '../imports/api/stocks';
import '../imports/api/soins';
import '../imports/api/tarifs';
import '../imports/api/polices';
import '../imports/api/tickets';
import '../imports/api/droits';
import '../imports/api/patients';
import '../imports/api/lits';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
    // code to run on server at startup
});
