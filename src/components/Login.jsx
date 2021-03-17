import React, { useEffect, useState, useRef } from 'react'
import loginStyles from '../css/loginStyles.module.css'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FaUserAlt, FaUnlock } from 'react-icons/fa';
// import { loginUser } from '../redux/users/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { loginExistingUser, resetLogin } from '../redux/users/userActions';
import swal from 'sweetalert';

function Login () {

  const customCard = {
    height: '55%',
    boxShadow: '0 4px 8px 0 rgb( 0 0 0 / 20%), 0 6px 20px 0 rgb( 0 0 0 / 19%)'
  }

  const loginTitle = {
    marginTop: '2rem',
    marginBottom: '2rem'
  }

  const dispatch = useDispatch();
  const logStatus = useSelector( state => state.userLoginStatus );
  //const loggedIn = useSelector( state => state.loggedIn );

  const fullWidth = { width: '100%' }

  const marginTop = { marginTop: '2rem' }

  const [loginUserName, setLoginUserName] = useState( '' );

  const [loginPassword, setLoginPassword] = useState( '' );

  const userNameRef = useRef( null );
  const passwordRef = useRef( null );
  const token = localStorage.getItem( "token" );

  //alert( loggedIn );

  let loggedIn = true;
  if ( token == null ) {
    loggedIn = false;
  }

  useEffect( () => {
    document.body.style.backgroundColor = "#eeecc0";
    userNameRef.current.focus();

  }, [] )



  useEffect( () => {
    //console.log( 'login status' );
    if ( logStatus === 1 ) {
      history.push( '/dashboard' );
      // console.log( 'login status' );

      //  console.log( loginStatus );
    }
    else if ( logStatus === -1 ) {

      swal( {
        title: "",
        text: "The user name & pwd does not match. Please try again.",
        icon: "warning",

      } )
        .then( ( willDelete ) => {
          if ( willDelete ) {
            // userNameRef.target.value = '';
            // passwordRef.target.value = '';

            setLoginUserName( '' );
            setLoginPassword( '' );

            userNameRef.current.focus();
            dispatch( resetLogin() );
          }
        } );


    }

  }, [logStatus] );

  const history = useHistory();

  const handleUserNameChange = event => {
    setLoginUserName( event.target.value );
  }

  const handleLoginPwdChange = event => {
    setLoginPassword( event.target.value );
  }

  const handleLoginSubmit = e => {

    dispatch( loginExistingUser( loginUserName, loginPassword ) );

    e.preventDefault();
  }

  // if ( loggedIn ) {
  //   // return <Redirect to="/dashboard" />
  // }

  return (

    <div className={loginStyles.myContainer}>
      <div className={` ${loginStyles.loginCard} card align-items-center`} style={customCard}>
        <div className={`${loginStyles.loginCardContent} card-body`} >

          <h6 className="card-subtitle mb-2 text-muted" style={marginTop}><Link to="/register" className={`${loginStyles.customLinks}`}>Create a new account</Link></h6>
          <h4 className="text-center card-title" style={loginTitle}>Login </h4>

          <form onSubmit={handleLoginSubmit}>

            <div className="input-group" style={fullWidth}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2"><FaUserAlt size={20} /></span>
              </div>
              <input type="text" autoComplete="off" ref={userNameRef} value={loginUserName} onChange={handleUserNameChange} className="form-control" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required />

            </div>
            <br />
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2"><FaUnlock size={20} /></span>
              </div>
              <input type="password" ref={passwordRef} value={loginPassword} onChange={handleLoginPwdChange} className="form-control" id="validationDefaultUsername" placeholder="Password" aria-describedby="inputGroupPrepend2" required />

            </div>

            <br />

            <label className="float-left"><a className={`${loginStyles.customLinks}`} href="">Forgot Password ?</a></label>
            <label className="float-right"><Link to="/register" className={`${loginStyles.customLinks}`}>Not a Member Yet ?</Link></label>
            <br /> <br />


            <div className="Center">
              <button type="submit" className="btn btn-info" >SIGN IN</button>

            </div>


          </form>
        </div>
      </div>

    </div >
  )
}

export default Login
