import React, { useEffect, useState } from 'react'
import Header from './Header';
// import landingStyles from '../css/landingStyles.module.css';
// import PlaceHolderImg1 from '../assets/nothumb.jpg';
import PlaceHolderImg2 from '../assets/nothumb.jpg';
import SubmittedArticlesStyles from '../css/submittedArticlesStyles.module.css';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
// import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import ReactPaginate from 'react-paginate';
// import Pagination from "react-js-pagination";
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { firebase } from '../firebase';
import { viewEditArticle } from '../redux/articles/articleActions';

function SubmittedArticles () {
    const history = useHistory();
    const dispatch = useDispatch();
    // Token
    // const token = localStorage.getItem( "token" );
    // const [loggedIn, setLoggedIn] = useState( false );

    const loggedInId = useSelector( state => state.loggedInId );
    const loggedIn = useSelector( state => state.loggedIn );
    const loggedInStatus = useSelector( state => state.userLoginStatus );
    const [submittedArticles, setSubmittedArticles] = useState( [] );
    const [currentSubmittedArticles, setCurrentSubmittedArticles] = useState( [] );
    // const [activePage, setActivePage] = useState( 10 );

    // const [pageNumber, setPageNumber] = useState( 0 );
    // const userPerPage = 2;
    // const pagesVisited = pageNumber * userPerPage;

    // const changePage = ( { selected } ) => {

    //     setPageNumber( selected );
    // }

    const editIconColor = { color: '#e6c200' }
    const deleteIconColor = { color: '#cc4600' }

    const fetchLoggedInUserArticles = () => {
        firebase.firestore().collection( "articles" ).where( "userId", "==", loggedInId )
            .get()
            .then( ( querySnapshot ) => {
                const loggedInUserArticles = querySnapshot.docs.map( ( doc ) => ( {
                    id: doc.id,
                    ...doc.data()
                } ) )
                //console.log( 'logged in user articles' );
                // console.log( loggedInUserArticles );
                setSubmittedArticles( loggedInUserArticles );


                // const pageCount = Math.ceil( submittedArticles.length / userPerPage );

            } )
            .catch( ( error ) => {
                console.log( "Error getting documents: ", error );
            } );
    }


    useEffect( () => {
        document.body.style.backgroundColor = "white";

        fetchLoggedInUserArticles();


    }, [] ) // removed
    // const [currentPage, setCurrentPage] = useState( 1 );
    // const [postsPerPage] = useState( 2 );

    // Get current posts
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = submittedArticles.slice( indexOfFirstPost, indexOfLastPost );

    // Change page
    // const paginate = pageNumber => {
    //     setCurrentPage( pageNumber );
    //     //alert( pageNumber );
    // }

    const editArticle = ( id, title, desc, img ) => {
        //alert( 'to edit: ' + id );
        dispatch( viewEditArticle( id, title, desc, img ) );
        history.push( '/editArticle' );
    }

    const deleteArticle = ( id ) => {
        swal( {
            title: "Are you sure ?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        } )
            .then( ( willDelete ) => {
                if ( willDelete ) {

                    firebase.firestore().collection( "articles" ).doc( id ).delete().then( () => {
                        //console.log( "Document successfully deleted!" );
                        fetchLoggedInUserArticles();

                        swal( {
                            title: "Article deleted successfully.",
                            text: "",
                            icon: "success",
                            button: "ok",
                        } );
                    } ).catch( ( error ) => {
                        console.error( "Error removing document: ", error );
                    } );

                } else {

                }
            } );

    }

    if ( loggedInStatus != 1 ) {
        return <Redirect to="/" />
    }
    return (
        <>
            <Header />
            <div className={`${SubmittedArticlesStyles.submittedArticles} container`}>

                <hr />
                <h4>YOUR SUBMITTED ATRICLES</h4>
                <hr />

                {submittedArticles.map( ( submittedArticle, index ) =>
                    <React.Fragment key={index}>

                        <div className="row mt-3">

                            <img src={submittedArticle.articleImg || PlaceHolderImg2} className={` ${SubmittedArticlesStyles.submittedArticleImgWidth} img-fluid thumbnail`} />

                            <div className={SubmittedArticlesStyles.articleDesc}>
                                <div>
                                    {/* <blockquote class="blockquote"> */}
                                    <h5>
                                        {submittedArticle.articleTitle}
                                    </h5>
                                    {/* </blockquote> */}
                                </div>
                                <div>{submittedArticle.articleDesc}</div>
                            </div>

                            <div className="align-self-center">
                                {/* <Link to="/viewArticle" > */}
                                <FaRegEdit onClick={() => { editArticle( submittedArticle.id, submittedArticle.articleTitle, submittedArticle.articleDesc, submittedArticle.articleImg ) }} size={40} style={editIconColor} className={SubmittedArticlesStyles.editIconColor} />
                                {/* </Link> */}
                            </div>

                            <div className="align-self-center ml-4"><FaTrashAlt size={40} onClick={() => { deleteArticle( submittedArticle.id ) }} style={deleteIconColor} className={SubmittedArticlesStyles.deleteIconColor} /></div>

                        </div>
                        <hr />
                    </React.Fragment>

                )}

                {/* <Pagination
                    activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                //onChange={this.handlePageChange.bind( this )}
                /> */}

                {/* <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}

                /> */}
                {/*
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={submittedArticles.length}
                    paginate={paginate}
                /> */}

            </div>

        </>
    )
}

export default SubmittedArticles
