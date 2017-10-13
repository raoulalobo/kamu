import { Meteor } from 'meteor/meteor';

import '../imports/api/users';
import '../imports/api/tarifs';
import '../imports/api/polices';
import '../imports/api/tickets';
import '../imports/api/droits';
import '../imports/api/patients';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
    // code to run on server at startup
});