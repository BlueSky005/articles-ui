
import React, { useEffect, useState, useRef } from 'react'
import Header from './Header';
// import landingStyles from '../css/landingStyles.module.css';
import PlaceHolderImg1 from '../assets/nothumb.jpg';
import PlaceHolderImg2 from '../assets/nothumb.jpg';
import EditArticleStyles from '../css/editArticleStyles.module.css';
import { editArticle, resetArticleEditStatus, fetchSelectedEditArticle } from '../redux/articles/articleActions';

import { useDispatch, useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { storage } from "../firebase";
import swal from 'sweetalert';

function EditArticle () {

    // const loggedIn = useSelector( state => state.loggedIn );
    const selectedEditArticleId = useSelector( state => state.selectedEditArticleId );

    const [editArticleTitle, setEditArticleTitle] = useState( '' );
    const [editArticleDesc, setEditArticleDesc] = useState( '' );
    const [editArticleImg, setEditArticleImg] = useState( '' );

    const loggedInStatus = useSelector( state => state.userLoginStatus );


    const selectedEditArticleTitle = useSelector( state => state.selectedEditArticleTitle );
    const selectedEditArticleDesc = useSelector( state => state.selectedEditArticleDesc );
    // const selectedArticleUserName = useSelector( state => state.selectedArticleUserName );
    const selectedEditArticleImage = useSelector( state => state.selectedEditArticleImage );

    const dispatch = useDispatch();

    const editArticleStatus = useSelector( state => state.editArticleStatus );

    const editArticleTitleRef = useRef( null );
    // editArticleTitleRef.value = selectedEditArticleTitle

    const [editImage, setEditImage] = useState( null );
    const [url, setUrl] = useState( "" );
    const [progress, setProgress] = useState( 0 );
    const [error, setError] = useState( "" );

    const loggedInUserName = useSelector( state => state.loggedInUserName );
    const loggedInId = useSelector( state => state.loggedInId );

    const handleTitleChange = e => {

        setEditArticleTitle( e.target.value );
    }

    const handleDescChange = e => {

        setEditArticleDesc( e.target.value );
    }

    const handleImgChange = e => {
        setEditArticleImg( e.target.value );
    }

    useEffect( () => {
        // alert( selectedEditArticleId );
        if ( loggedInStatus === 1 ) {
            setEditArticleTitle( selectedEditArticleTitle );
            setEditArticleDesc( selectedEditArticleDesc );
            setEditArticleImg( selectedEditArticleImage );

            //alert( 'before dispatch' );
            // dispatch( fetchSelectedEditArticle( selectedEditArticleId ) ); // remove it later
            editArticleTitleRef.current.focus();
        }
    }, [] )

    useEffect( () => {

        if ( editArticleStatus === 1 ) {

            swal( {
                title: "",
                text: "Your Article has been edited successfully.",
                icon: "info",

            } )
                .then( ( willDelete ) => {
                    if ( willDelete ) {

                        dispatch( resetArticleEditStatus() );
                    }
                } );

            //  console.log( loginStatus );
        }

    }, [editArticleStatus] );

    const handlePostArticleSubmit = e => { // form submit
        // selectedEditArticleId

        if ( editImage ) {
            const uploadTask = storage.ref( `images/${editImage.name}` ).put( editImage );

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
                        .child( editImage.name )
                        .getDownloadURL()
                        .then( url => {
                            setUrl( url );
                            setProgress( 0 );


                            // Upload imag done add data here
                            //alert( 'before passing: ' + loggedInId + 'name : ' + loggedInUserName );

                            dispatch( editArticle( selectedEditArticleId, selectedEditArticleTitle, selectedEditArticleDesc, url, loggedInId, loggedInUserName ) );


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
                        setEditImage( file );

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
                <div className={`${EditArticleStyles.writeArticleForm} container`}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">TITLE {selectedEditArticleTitle} </label>
                        <input ref={editArticleTitleRef} value={editArticleTitle} autoComplete="off" type="text" onChange={handleTitleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the title" />

                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleTextarea">DESCRIPTION</label>
                        <textarea value={editArticleDesc} onChange={handleDescChange} placeholder="Enter the article description" className="form-control" id="exampleTextarea" rows="3"></textarea>
                    </div>

                    <div>
                        <div className={EditArticleStyles.uploadImgBtns}>
                            <button type="submit" className="btn btn-primary"> Upload</button>
                            <input type="file" onChange={handChange} />{" "}

                        </div>
                        <div style={{ height: "100px" }}>
                            {progress > 0 ? <progress value={progress} max="100" /> : ""}
                            <p style={{ color: "red" }}>{error}</p>
                        </div>

                        {url ? (
                            <img src={url || editArticleImg} onChange={handleImgChange} className="img-fluid" alt="logo" />
                        ) : (
                            <img src={editArticleImg || PlaceHolderImg2} onChange={handleImgChange} className="App-logo img-fluid" alt="logo" />
                        )}
                    </div>

                </div>
            </form>
            <br /><br />
        </>
    )
}

export default EditArticle
