import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Router, Route, browserHistory } from 'react-router';

import Usrs from '../ui/Usrs';
import HomePage from '../ui/HomePage';

import Login from '../ui/Login';
import Patients from '../ui/Patients';
import Tickets from '../ui/Tickets';
import NotFound from '../ui/NotFound';
import FicheMedicale from '../ui/FicheMedicale';

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
    const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
    const isAuthenticatedPage = currentPagePrivacy === 'auth';

    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/homepage');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/');
    }
};
export const globalOnChange = (prevState, nextState) => {
    globalOnEnter(nextState);
    //console.log(prevState,nextState);
};
export const globalOnEnter = (nextState) => {
    const lastRoute = nextState.routes[nextState.routes.length - 1];
    //console.log(nextState);
    Session.set('currentPagePrivacy', lastRoute.privacy);
    Session.set('permissionRole', lastRoute.nomane);
};

const rls_0 = ['admin'];
const rls_1 = ['admin','caisse'];
const rls_2 = ['admin','medecin','colis'];

const onEnterRolePage = (nextState) => {
    //console.log(nextState);
    const lastRoute = nextState.routes[nextState.routes.length - 1];
    Session.set('permissionRole', lastRoute.nomane);
    const permissionRole = Session.get('permissionRole');
    if ( !Roles.userIsInRole(Meteor.userId(), permissionRole ) ) {
        browserHistory.replace('/NotFound');
    }
};

export const routes = (

    <Router history={browserHistory}>
        <Route onEnter={globalOnEnter} onChange={globalOnChange}>

            <Route path="/users" component={Usrs} privacy="auth" nomane={rls_0} onEnter={onEnterRolePage}/>
            <Route path="/homepage" component={HomePage} privacy="auth" nomane={rls_2} onEnter={onEnterRolePage} />
            <Route path="/patients" component={Patients} privacy="auth" nomane={rls_2} onEnter={onEnterRolePage} />
            <Route path="/tickets" component={Tickets} privacy="auth" nomane={rls_2} onEnter={onEnterRolePage} />
            <Route path="/fiches-medicales" component={FicheMedicale} privacy="auth" nomane={rls_2} onEnter={onEnterRolePage} />
            {/*<Route path="/departs" component={Departs} privacy="auth" nomane={rls_1} onEnter={onEnterRolePage}/>*/}
            {/*<Route path="/depenses" component={Depenses} privacy="auth" nomane={rls_1} onEnter={onEnterRolePage}/>*/}
            {/*<Route path="/colis" component={Colis} privacy="auth" nomane={rls_2} onEnter={onEnterRolePage}/>*/}
            {/*<Route path="/resas" component={Resa} privacy="auth" nomane={rls_2} onEnter={onEnterRolePage}/>*/}
            <Route path="/" component={Login} privacy="unauth" nomane="joedoe5"/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);
