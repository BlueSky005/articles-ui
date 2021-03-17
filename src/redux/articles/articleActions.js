import {
    PUBLISH_ARTICLE, FETCH_SELECTED_EDIT_ARTICLE, VIEW_EDIT_ARTICLE, UPDATE_ARTICLE,
    // DELETE_ARTICLE, VIEW_SUBMITTED_ARTICLE, VIEW_ALL_ARTICLES,
    VIEW_SELECTED_ARTICLE, FETCH_SELECTED_ARTICLE_DETAILS
} from './articleTypes';
import firebase from 'firebase';

export const postArticleRequest = ( postArticleStatus ) => {

    return {
        type: PUBLISH_ARTICLE,
        payload: postArticleStatus
    }
}

export const editArticleRequest = ( editArticleStatus ) => {

    return {
        type: UPDATE_ARTICLE,
        payload: editArticleStatus
    }
}

export const editArticle = ( articleId, articleTitle, articleDesc, articleImg, loggedInId, loggedInUserName ) => {

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

export const fetchArticleDetailsRequest = ( selectedArticleDetails ) => {

    return {
        type: FETCH_SELECTED_ARTICLE_DETAILS,
        payload: selectedArticleDetails
    }
}

export const fetchArticleDetails = ( selectedArticleId ) => {

    return function ( dispatch ) {

        var docRef = firebase.firestore().collection( "articles" ).doc( selectedArticleId );

        docRef.get().then( function ( doc ) {
            if ( doc.exists ) {
                console.log( "Document data:", doc.data() );
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
export const fetchSelectedEditArticle = ( selectedArticleId ) => {

    alert( 'on track...' );
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


export const fetchSelectedEditArticleRequest = ( selectedEditArticle ) => {

    return {
        type: FETCH_SELECTED_EDIT_ARTICLE,
        payload: selectedEditArticle
    }
}


export const viewSpecificArticleRequest = ( selectedArticleId ) => {

    return {
        type: VIEW_SELECTED_ARTICLE,
        payload: selectedArticleId
    }
}

export const viewSpecificArticle = ( selectedArticleId ) => {

    return function ( dispatch ) {
        dispatch( viewSpecificArticleRequest( selectedArticleId ) )
    }
}

export const viewEditArticleRequest = ( viewEditArticleDetails ) => {

    return {
        type: VIEW_EDIT_ARTICLE,
        payload: viewEditArticleDetails
    }
}

export const viewEditArticle = ( id, title, desc, img ) => {

    return function ( dispatch ) {
        dispatch( viewEditArticleRequest( { id, title, desc, img } ) )
    }
}

export const postArticle = ( articleTitle, articleDesc, articleImg, loggedInId, loggedInUserName ) => {

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


export const resetWriteAtricleUI = () => {
    return function ( dispatch ) {
        dispatch( postArticleRequest( 0 ) )
    }
}