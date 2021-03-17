import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from './userTypes'
// import axios from 'axios';
import firebase from 'firebase';

export const loginUserRequest = ( loginStatus, userName = '', id = '' ) => {

    return {
        type: LOGIN_USER,
        payload: { loginStatus: loginStatus, userName: userName, id: id }
    }
}

export const registerUserRequest = ( loginStatus ) => {
    return {
        type: REGISTER_USER,
        payload: loginStatus
    }
}

export const logoutUserRequest = () => {
    return {
        type: LOGOUT_USER

    }
}

export const logoutUser = () => {
    return function ( dispatch ) {

        dispatch( logoutUserRequest() )
    }
}

export const loginExistingUser = ( userName, userPassword ) => {

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

export const registerNewUser = ( registerUserName, registerUserPwd ) => {

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

export const resetLogin = () => {
    return function ( dispatch ) {
        dispatch( loginUserRequest( 0 ) )
    }
}


export const resetRegistration = () => {
    return function ( dispatch ) {
        dispatch( registerUserRequest( 0 ) )
    }
}

// export default {
//     loginUserRequest,
//     registerUserRequest,

// }