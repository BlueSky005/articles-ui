import {
    PUBLISH_ARTICLE, FETCH_SELECTED_EDIT_ARTICLE, VIEW_EDIT_ARTICLE, UPDATE_ARTICLE,
    VIEW_SELECTED_ARTICLE, FETCH_SELECTED_ARTICLE_DETAILS, REST_EDIT_ARTICLE_STATUS
    // DELETE_ARTICLE, VIEW_SUBMITTED_ARTICLE, VIEW_ALL_ARTICLES,
} from './articleTypes';
import firebase from 'firebase';

const postArticleRequest = ( postArticleStatus ) => {
    return {
        type: PUBLISH_ARTICLE,
        payload: postArticleStatus
    }
}

const resetArticleEditStatusRequest = ( editArticleStatus ) => {
    return {
        type: REST_EDIT_ARTICLE_STATUS,
        payload: editArticleStatus
    }
}

const editArticleRequest = ( editArticleStatus ) => {
    return {
        type: UPDATE_ARTICLE,
        payload: editArticleStatus
    }
}

const editArticle = ( articleId, articleTitle, articleDesc, articleImg, loggedInId, loggedInUserName ) => {

    return function ( dispatch ) {
        firebase.firestore().collection( "articles" ).doc( articleId ).set( {
            articleTitle: articleTitle,
            articleDesc: articleDesc,
            articleImg: articleImg,
            userName: loggedInUserName,
            userId: loggedInId
        } )
            .then( () => {
                //console.log("Document written with ID: ", docRef.id);
                dispatch( editArticleRequest( 1 ) );
            } )
            .catch( ( error ) => {
                console.error( "Error adding document: ", error );
            } );
    }
}

const fetchArticleDetailsRequest = ( selectedArticleDetails ) => {
    return {
        type: FETCH_SELECTED_ARTICLE_DETAILS,
        payload: selectedArticleDetails
    }
}

const fetchArticleDetails = ( selectedArticleId ) => {
    return function ( dispatch ) {
        var docRef = firebase.firestore().collection( "articles" ).doc( selectedArticleId );
        docRef.get().then( function ( doc ) {
            if ( doc.exists ) {
                // console.log( "Document data:", doc.data() );
                dispatch( fetchArticleDetailsRequest( doc.data() ) )
            } else {
                // doc.data() will be undefined in this case
                //console.log( "No such document!" );
            }
        } ).catch( function ( error ) {
            console.log( "Error getting document:", error );
        } );

    }
}
const fetchSelectedEditArticle = ( selectedArticleId ) => {
    return function ( dispatch ) {
        var docRef = firebase.firestore().collection( "articles" ).doc( selectedArticleId );
        docRef.get().then( function ( doc ) {
            if ( doc.exists ) {
                console.log( "Document data:", doc.data() );
                dispatch( fetchSelectedEditArticleRequest( doc.data() ) )
            } else {
                // doc.data() will be undefined in this case
                //console.log( "No such document!" );
            }
        } ).catch( function ( error ) {
            console.log( "Error getting document:", error );
        } );
    }
}

const fetchSelectedEditArticleRequest = ( selectedEditArticle ) => {
    return {
        type: FETCH_SELECTED_EDIT_ARTICLE,
        payload: selectedEditArticle
    }
}

const viewSpecificArticleRequest = ( selectedArticleId ) => {
    return {
        type: VIEW_SELECTED_ARTICLE,
        payload: selectedArticleId
    }
}

const viewSpecificArticle = ( selectedArticleId ) => {
    return function ( dispatch ) {
        dispatch( viewSpecificArticleRequest( selectedArticleId ) )
    }
}

const viewEditArticleRequest = ( viewEditArticleDetails ) => {
    return {
        type: VIEW_EDIT_ARTICLE,
        payload: viewEditArticleDetails
    }
}

const viewEditArticle = ( id, title, desc, img ) => {
    return function ( dispatch ) {
        dispatch( viewEditArticleRequest( { id, title, desc, img } ) )
    }
}

const postArticle = ( articleTitle, articleDesc, articleImg, loggedInId, loggedInUserName ) => {
    return function ( dispatch ) {
        firebase.firestore().collection( "articles" ).add( {
            articleTitle: articleTitle,
            articleDesc: articleDesc,
            articleImg: articleImg,
            userName: loggedInUserName,
            userId: loggedInId
        } )
            .then( ( docRef ) => {
                //console.log("Document written with ID: ", docRef.id);
                dispatch( postArticleRequest( 1 ) );
            } )
            .catch( ( error ) => {
                console.error( "Error adding document: ", error );
            } );
    }
}

const resetWriteAtricleUI = () => {
    return function ( dispatch ) {
        dispatch( postArticleRequest( 0 ) )
    }
}

const resetArticleEditStatus = () => {
    return function ( dispatch ) {
        dispatch( resetArticleEditStatusRequest( 0 ) )
    }
}

export {
    postArticleRequest,
    resetArticleEditStatusRequest,
    editArticleRequest,
    editArticle,
    fetchArticleDetailsRequest,
    fetchArticleDetails,
    fetchSelectedEditArticle,
    fetchSelectedEditArticleRequest,
    viewSpecificArticleRequest,
    viewSpecificArticle,
    viewEditArticleRequest,
    viewEditArticle,
    postArticle,
    resetWriteAtricleUI,
    resetArticleEditStatus
}