import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from './userTypes'
import firebase from 'firebase';

const loginUserRequest = ( loginStatus, userName = '', id = '' ) => {
    return {
        type: LOGIN_USER,
        payload: { loginStatus: loginStatus, userName: userName, id: id }
    }
}

const registerUserRequest = ( loginStatus ) => {
    return {
        type: REGISTER_USER,
        payload: loginStatus
    }
}

const logoutUserRequest = () => {
    return {
        type: LOGOUT_USER

    }
}

const logoutUser = () => {
    return function ( dispatch ) {

        dispatch( logoutUserRequest() )
    }
}

const loginExistingUser = ( userName, userPassword ) => {
    return function ( dispatch ) {
        firebase.firestore().collection( 'users' ).where( 'userName', '==', userName ).where( 'password', '==', userPassword ).onSnapshot( ( snapshot ) => {
            const checkUser = snapshot.docs.map( ( doc ) => ( {
                id: doc.id,
                ...doc.data()
            } ) )


            if ( checkUser.length > 0 ) {
                localStorage.setItem( "token", "jdfsshdfdsfsdfsdfsdfsfd" );
                dispatch( loginUserRequest( 1, checkUser[0].userName, checkUser[0].id ) )
            }
            else
                dispatch( loginUserRequest( -1 ) )
        } )
    }
}

const registerNewUser = ( registerUserName, registerUserPwd ) => {
    return function ( dispatch ) {
        firebase.firestore().collection( 'users' ).add( {
            userName: registerUserName,
            password: registerUserPwd
        } )
            .then( ( docRef ) => {

                dispatch( registerUserRequest( 1 ) )

            } )
            .catch( ( error ) => {
                console.error( "Error adding document: ", error );
                dispatch( registerUserRequest( -1 ) )
            } );
    }
}

const resetLogin = () => {
    return function ( dispatch ) {
        dispatch( loginUserRequest( 0 ) )
    }
}

const resetRegistration = () => {
    return function ( dispatch ) {
        dispatch( registerUserRequest( 0 ) )
    }
}

export {
    loginUserRequest,
    registerUserRequest,
    logoutUserRequest,
    logoutUser,
    loginExistingUser,
    registerNewUser,
    resetLogin,
    resetRegistration
}