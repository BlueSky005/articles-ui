import React, { useEffect, useState } from 'react'
import Header from './Header';
// import landingStyles from '../css/landingStyles.module.css';
import PlaceHolderImg2 from '../assets/nothumb.jpg';
import ViewArticlesStyles from '../css/viewArticlesStyles.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleDetails } from '../redux/articles/articleActions';

function ViewArticles () {

    const loggedIn = useSelector( state => state.loggedIn );

    const selectedArticleId = useSelector( state => state.selectedArticleId );

    const selectedArticleTitle = useSelector( state => state.selectedArticleTitle );
    const selectedArticleUserName = useSelector( state => state.selectedArticleUserName );
    const selectedArticleImage = useSelector( state => state.selectedArticleImage );
    const selectedArticleDesc = useSelector( state => state.selectedArticleDesc );

    const loggedInStatus = useSelector( state => state.userLoginStatus );

    // alert( 'selected article titel : ' + selectedArticleTitle );

    // Token
    // const token = localStorage.getItem( "token" );
    // const [loggedIn, setLoggedIn] = useState( false );

    // if ( loggedIn === false ) {
    //     return <Redirect to="/" />
    // }

    const dispatch = useDispatch();

    useEffect( () => {
        //alert( 'selected article id : ' + selectedArticleId );
        if ( loggedIn )
            dispatch( fetchArticleDetails( selectedArticleId ) );
    }, [] );


    if ( loggedInStatus != 1 ) {
        return <Redirect to="/" />
    }


    return (
        <>
            <Header />

            <div className="container">
                <div className={ViewArticlesStyles.viewArticle}>
                    <div className="row justify-content-center">
                        <img className={`${ViewArticlesStyles.viewArticlesmgWidth} img-fluid img-thumbnail`} src={selectedArticleImage || PlaceHolderImg2} />
                    </div>

                    <div className={ViewArticlesStyles.viewHeader}>
                        <strong className="">{selectedArticleTitle}</strong>
                        <strong className="">Date</strong>

                    </div>
                    <br />
                    <hr />

                    <p>{selectedArticleDesc}</p>

                    <br />

                    <p><FaRegUserCircle size={30} /><em>   by</em> <strong>{selectedArticleUserName}</strong></p>
                </div>
            </div>
        </>
    )
}

export default ViewArticles
