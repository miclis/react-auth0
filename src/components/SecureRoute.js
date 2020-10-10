import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AuthContext from './AuthContext';

function SecureRoute({ component: Component, scopes, ...rest }) {
    const auth = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) => {
                // 1. Redirect to login if not logged in.
                if (!auth.isAuthenticated()) return auth.login();

                // 2. Display message if user lacks required scope(s).
                if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
                    return (
                        <h1>Unauthorized - you need the following scopes(s) to view this page: {scopes.join(',')}.</h1>
                    );
                }

                // 3. Render component
                return <Component auth={auth} {...props} />;
            }}
        />
    );
}

SecureRoute.propTypes = {
    component: PropTypes.func.isRequired,
    scopes: PropTypes.array,
};

SecureRoute.defaultProps = {
    scopes: [],
};

export default SecureRoute;
