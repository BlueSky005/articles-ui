import React, { useEffect, useState } from 'react'
import Header from './Header';
// import landingStyles from '../css/landingStyles.module.css';
import PlaceHolderImg1 from '../assets/nothumb.jpg';
import PlaceHolderImg2 from '../assets/nothumb.jpg';
import LandingStyles from '../css/landingStyles.module.css';
import { FaTags } from 'react-icons/fa';
import { firebase } from '../firebase';
import { Redirect } from 'react-router-dom';
import { FaCannabis } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { viewSpecificArticle } from '../redux/articles/articleActions';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import _ from "lodash";

function Landing () {

    // // Token
    // const token = localStorage.getItem( "token" );
    // const [loggedIn, setLoggedIn] = useState( false );
    const dispatch = useDispatch();
    const [topArticles, setTopArticles] = useState( [] );
    const [articles, setArticles] = useState( [] );

    const viewArticleDetails = ( articleId ) => {

        dispatch( viewSpecificArticle( articleId ) );

    }
    const loggedIn = useSelector( state => state.loggedIn );
    const loggedInStatus = useSelector( state => state.userLoginStatus );
    useEffect( () => {
        document.body.style.backgroundColor = "white";

        firebase.firestore().collection( 'articles' ).onSnapshot( ( snapshot ) => {
            const allArticles = snapshot.docs.map( ( doc ) => ( {
                id: doc.id,
                ...doc.data()
            } ) )

            // console.log( allArticles );
            setArticles( allArticles );

            const sortedArticles = _.orderBy( allArticles, ['articleTitle', 'views'], ['desc'] );

            const top4Articles = _.take( sortedArticles, 4 );

            //console.log( 'top 4 sorted' );

            // console.log( top4Articles );

            setTopArticles( top4Articles );

        } )


    }, [] )

    if ( loggedInStatus != 1 ) {
        return <Redirect to="/" />
    }

    return (
        <>
            <Header />
            <br />
            <div className="container">

                <div className={`row ${LandingStyles.landingContainer}`}>


                    <div className={LandingStyles.articlesContainer} >
                        {articles.map( ( article, index ) =>
                            <React.Fragment key={index}>
                                <div className="">
                                    <img src={article.articleImg || PlaceHolderImg1} className={`img-fluid ${LandingStyles.fullWidth}`} />
                                </div>

                                <br />
                                <div className="">
                                    <h5>{article.articleTitle}</h5>
                                </div>
                                <div className="">
                                    {article.articleDesc}
                                </div>
                                <div className={LandingStyles.placeRight}>
                                    <Link to="/viewArticle" onClick={() => { viewArticleDetails( article.id ) }} style={{ color: '#C0392B' }} className={LandingStyles.viewMoreLinks}> Read more. 7 min read <FaCannabis className="ml-2" size={15}></FaCannabis></Link>
                                </div>
                                <br />
                            </React.Fragment>

                        )}
                    </div>


                    <div className={LandingStyles.topArticlesContainer} >
                        <hr />

                        <h2>TOP ARTICLES</h2>

                        <hr />

                        {topArticles.map( ( topArticle, index ) =>
                            <div className="row" key={index}>
                                <div className={LandingStyles.topArticleDesc}>
                                    <div><FaTags style={{ color: '#1E8449' }} /> {topArticle.userName}</div>
                                    <div ><blockquote className="blockquote">{topArticle.articleTitle}</blockquote></div>
                                    <div >Date</div>
                                </div>
                                <div className={LandingStyles.topArticleImg}>
                                    <img src={topArticle.articleImg || PlaceHolderImg2} className={`img-fluid ${LandingStyles.fullWidth}`} />
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing
