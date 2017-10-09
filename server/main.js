import { Meteor } from 'meteor/meteor';

import '../imports/api/users';
import '../imports/api/droits';
import '../imports/api/patients';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
    // code to run on server at startup
});