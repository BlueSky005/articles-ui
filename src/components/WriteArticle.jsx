
import React, { useEffect, useState, useRef } from 'react'
import Header from './Header';
// import landingStyles from '../css/landingStyles.module.css';
import PlaceHolderImg2 from '../assets/nothumb.jpg';
import WriteStyles from '../css/writeArticleStyles.module.css';
import { postArticle, resetWriteAtricleUI } from '../redux/articles/articleActions';

import { useDispatch, useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { storage } from "../firebase";
import swal from 'sweetalert';
// import { useHistory } from 'react-router-dom';

function WriteArticle () {

    const loggedIn = useSelector( state => state.loggedIn );

    // Token
    // const token = localStorage.getItem( "token" );
    // const [loggedIn, setLoggedIn] = useState( false );
    const [articleTitle, setArticleTitle] = useState( '' );
    const [articleDesc, setArticleDesc] = useState( '' );

    const loggedInStatus = useSelector( state => state.userLoginStatus );

    const dispatch = useDispatch();

    const articlePostStatus = useSelector( state => state.postArticleStatus );

    const articleTitleRef = useRef( null );

    const [image, setImage] = useState( null );
    const [url, setUrl] = useState( "" );
    const [progress, setProgress] = useState( 0 );
    const [error, setError] = useState( "" );

    const loggedInUserName = useSelector( state => state.loggedInUserName );
    const loggedInId = useSelector( state => state.loggedInId );

    // alert( 'user: ' + loggedInUserName + ' id: ' + loggedInId );

    const handleTitleChange = event => {
        setArticleTitle( event.target.value );
    }

    const handleDescChange = event => {
        setArticleDesc( event.target.value );
    }

    useEffect( () => {
        if ( loggedIn )
            articleTitleRef.current.focus();
    }, [] )

    useEffect( () => {

        if ( articlePostStatus === 1 ) {

            swal( {
                title: "",
                text: "Your Article has been posted successfully.",
                icon: "info",

            } )
                .then( ( willDelete ) => {
                    if ( willDelete ) {

                        dispatch( resetWriteAtricleUI() );
                    }
                } );

            //  console.log( loginStatus );
        }

    }, [articlePostStatus] );

    const handlePostArticleSubmit = e => { // form submit


        if ( image ) {
            const uploadTask = storage.ref( `images/${image.name}` ).put( image );

            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
                    );
                    setProgress( progress );
                },
                error => {
                    setError( error );
                },
                () => {
                    storage
                        .ref( "images" )
                        .child( image.name )
                        .getDownloadURL()
                        .then( url => {
                            setUrl( url );
                            setProgress( 0 );


                            // Upload imag done add data here
                            //alert( 'before passing: ' + loggedInId + 'name : ' + loggedInUserName );

                            dispatch( postArticle( articleTitle, articleDesc, url, loggedInId, loggedInUserName ) );

                        } );
                }
            );
        } else {
            setError( "Error please choose an image to upload" );
        }

        e.preventDefault();
    }

    const handChange = e => {
        const file = e.target.files[0];
        var reader = new FileReader();
        //var url = reader.readAsDataURL( file );

        reader.onload = () => {
            if ( reader.readyState === 2 ) {

                if ( file ) {
                    const fileType = file["type"];
                    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
                    if ( validImageTypes.includes( fileType ) ) {
                        setError( "" );
                        // setImage( file );
                        setImage( file );

                    } else {
                        setError( "Please select an image to upload" );
                    }
                }
            }
        }
        reader.readAsDataURL( e.target.files[0] )


    };

    if ( loggedInStatus != 1 ) {
        return <Redirect to="/" />
    }


    return (
        <>
            <Header />
            <br />
            <form onSubmit={handlePostArticleSubmit}>
                <div className={`${WriteStyles.writeArticleForm} container`}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">TITLE</label>
                        <input ref={articleTitleRef} autoComplete="off" type="text" onChange={handleTitleChange} value={articleTitle} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the title" />

                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleTextarea">DESCRIPTION</label>
                        <textarea value={articleDesc} onChange={handleDescChange} placeholder="Enter the article description" className="form-control" id="exampleTextarea" rows="3"></textarea>
                    </div>

                    <div>
                        <div className={WriteStyles.uploadImgBtns}>
                            <button type="submit" className="btn btn-primary"> Upload</button>
                            <input type="file" onChange={handChange} />{" "}

                        </div>
                        <div style={{ height: "100px" }}>
                            {progress > 0 ? <progress value={progress} max="100" /> : ""}
                            <p style={{ color: "red" }}>{error}</p>
                        </div>
                        {url ? (
                            <img src={url} className="img-fluid" alt="logo" />
                        ) : (
                            <img src={PlaceHolderImg2} className="App-logo img-fluid" alt="logo" />
                        )}
                    </div>

                </div>
            </form>
            <br /><br />
        </>
    )
}

export default WriteArticle
