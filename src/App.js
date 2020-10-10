import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Auth, { LOGGED_IN_FLAG } from './Auth/Auth';
import Callback from './components/Callback';
import Home from './components/Home';
import Nav from './components/Nav';
import Private from './components/Private';
import Profile from './components/Profile';
import Public from './components/Public';
import Courses from './components/Courses';
import SecureRoute from './components/SecureRoute';
import AuthContext from './components/AuthContext';

function App(props) {
    const userWasLoggedIn = localStorage.getItem(LOGGED_IN_FLAG);

    const [auth, setAuth] = useState(new Auth(props.history));
    const [tokenRenewalComplete, setTokenRenewalComplete] = useState(userWasLoggedIn ? false : true);

    useEffect(() => {
        if (userWasLoggedIn) {
            auth.renewToken(() => {
                setTokenRenewalComplete(true);
            });
        }
    }, []);

    if (!tokenRenewalComplete) return 'Loading...';
    return (
        <AuthContext.Provider value={auth}>
            <Nav auth={auth} />
            <div className='body'>
                <Route path='/' exact render={(props) => <Home auth={auth} {...props} />} />
                <Route path='/callback' render={(props) => <Callback auth={auth} {...props} />} />
                <SecureRoute path='/profile' component={Profile} />
                <Route path='/public' component={Public} />
                <SecureRoute path='/private' component={Private} />
                <SecureRoute path='/courses' component={Courses} scopes={['read:courses']} />
            </div>
        </AuthContext.Provider>
    );
}

export default App;
