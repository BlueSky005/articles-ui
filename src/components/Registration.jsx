import React, { useEffect, useState, useRef } from 'react'
import registrationStyles from '../css/registrationStyles.module.css'
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserAlt, FaUnlock } from 'react-icons/fa';

import { registerNewUser, resetRegistration } from '../redux/users/userActions';
import swal from 'sweetalert';

function Registration () {

    const [registerUserName, setRegisterUserName] = useState( '' );
    const [registerUserPwd, setRegisterUserPwd] = useState( '' );

    const registerUserNameRef = useRef( null );
    const registerPwdRef = useRef( null );

    const customCard = {
        height: '55%',
        boxShadow: '0 4px 8px 0 rgb( 0 0 0 / 20%), 0 6px 20px 0 rgb( 0 0 0 / 19%)'
    }

    const registrationTitle = {
        marginTop: '2rem',
        marginBottom: '2rem'
    }

    const fullWidth = { width: '100%' }

    const marginTop = { marginTop: '2rem' }

    const history = useHistory();

    const dispatch = useDispatch();
    const registerStatus = useSelector( state => state.userRegistrationStatus );

    useEffect( () => {
        document.body.style.backgroundColor = "#eeecc0";
        registerUserNameRef.current.focus();
    }, [] )

    useEffect( () => {

        if ( registerStatus === 1 ) {

            swal( {
                title: "",
                text: "Registration Successfull",
                icon: "success",

            } )
                .then( ( willDelete ) => {
                    if ( willDelete ) {
                        // userNameRef.target.value = '';
                        // passwordRef.target.value = '';

                        setRegisterUserName( '' );
                        setRegisterUserPwd( '' );

                        registerUserNameRef.current.focus();
                        history.push( '/login' );
                        dispatch( resetRegistration() );
                    }
                } );
        }

    }, [registerStatus] );

    const handleRegisterUserNameChange = event => {
        setRegisterUserName( event.target.value );
    }

    const handleRegisterUserPwdChange = event => {
        setRegisterUserPwd( event.target.value );
    }

    const registerUser = e => {

        dispatch( registerNewUser( registerUserName, registerUserPwd ) );

        e.preventDefault();

    }

    return (

        <div className={registrationStyles.myContainer}>
            <div className={` ${registrationStyles.registrationCard} card align-items-center`} style={customCard}>
                <div className={`${registrationStyles.registrationCardContent} card-body`} >

                    <h6 className="card-subtitle mb-2 text-muted" style={marginTop}><Link to="/login" className={`${registrationStyles.customLinks}`}>Login Page</Link></h6>
                    <h4 className="text-center card-title" style={registrationTitle}>Registration</h4>

                    <form onSubmit={registerUser}>

                        <div className="input-group" style={fullWidth}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend2"><FaUserAlt size={20} /></span>
                            </div>
                            <input type="text" autoComplete="off" ref={registerUserNameRef} onChange={handleRegisterUserNameChange} value={registerUserName} className="form-control" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required />

                        </div>
                        <br />
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend2"><FaUnlock size={20} /></span>
                            </div>
                            <input type="password" onChange={handleRegisterUserPwdChange} ref={registerPwdRef} value={registerUserPwd} className="form-control" id="validationDefaultUsername" placeholder="Password" aria-describedby="inputGroupPrepend2" required />

                        </div>

                        <br />

                        <br />

                        <div className="Center">
                            <button className="btn btn-info" >REGISTER</button>

                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Registration
