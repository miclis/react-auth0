import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    const { isAuthenticated, userHasScopes, login, logout } = props.auth;
    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to='/' activeClassName='activeLink'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to='/profile' activeClassName='activeLink'>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/public' activeClassName='activeLink'>
                        Public
                    </NavLink>
                </li>
                {isAuthenticated() && (
                    <li>
                        <NavLink to='/private' activeClassName='activeLink'>
                            Private
                        </NavLink>
                    </li>
                )}
                {isAuthenticated() && userHasScopes(['read:courses']) && (
                    <li>
                        <NavLink to='/courses' activeClassName='activeLink'>
                            Courses
                        </NavLink>
                    </li>
                )}
                <li>
                    <button onClick={isAuthenticated() ? logout : login}>
                        {isAuthenticated() ? 'Log Out' : 'Log In'}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
