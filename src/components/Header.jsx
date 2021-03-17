import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../redux/users/userActions';
function Header () {

    const loggedIn = useSelector( state => state.loggedIn );
    const loggedInUserName = useSelector( state => state.loggedInUserName );
    const history = useHistory();
    const dispatch = useDispatch();

    const userLoggedOut = () => {
        // localStorage.removeItem( "token" );
        dispatch( logoutUser() );
        // history.push( '/' );
    }

    const dashboard = () => {
        history.push( '/dashboard' );
    }

    const publish = () => {
        history.push( '/publish' );
    }

    const yourArticles = () => {
        history.push( '/yourArticles' );
    }

    const headerStyles = {
        backgroundColor: '#A9CCE3',
        color: 'black',
        fontSize: '1.3rem'

    }
    // if ( loggedIn === false ) {
    //     return <Redirect to="/" />
    // }


    return (

        <div className="d-flex" style={headerStyles}>
            <div className="mr-auto p-2">
                <blockquote className="blockquote">
                    Greetings {loggedInUserName}
                </blockquote>
            </div>
            <div className="p-2"><button className="btn btn-secondary" onClick={dashboard}>Dashboard</button></div>
            <div className="p-2"><button className="btn btn-secondary" onClick={publish}>Publish</button></div>
            <div className="p-2"> <button className="btn btn-secondary" onClick={yourArticles}>Your Articles</button></div>
            <div className="p-2"> <button onClick={userLoggedOut} className="btn btn-secondary">Logout</button></div>
        </div>

    )
}

export default Header
