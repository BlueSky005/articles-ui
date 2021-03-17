import {
    PUBLISH_ARTICLE, FETCH_SELECTED_EDIT_ARTICLE, VIEW_EDIT_ARTICLE, UPDATE_ARTICLE,
    VIEW_SELECTED_ARTICLE, FETCH_SELECTED_ARTICLE_DETAILS, REST_EDIT_ARTICLE_STATUS
    // DELETE_ARTICLE, VIEW_SUBMITTED_ARTICLE, VIEW_ALL_ARTICLES,
} from '../articles/articleTypes';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from '../users/userTypes';

const initialState = {

    articleTitle: '',
    articleDesc: '',
    postArticleStatus: 0,

    userPassword: '',
    userLoginStatus: 0,
    userRegistrationStatus: 0,
    loggedInUserName: '',

    loggedInId: '',
    selectedArticleId: '',

    selectedEditArticleId: '',
    selectedEditArticleTitle: '',
    selectedEditArticleDesc: '',
    selectedEditArticleUserName: '',
    selectedEditArticleImage: '',

    selectedArticleTitle: '',
    selectedArticleDesc: '',
    selectedArticleUserName: '',
    selectedArticleImage: '',

    editArticleStatus: 0,

    // loggedIn: false
}


const userArticleReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case PUBLISH_ARTICLE: return {
            ...state,
            postArticleStatus: action.payload
        }

        case LOGIN_USER: return {
            ...state,
            userLoginStatus: action.payload.loginStatus,
            loggedInUserName: action.payload.userName,
            loggedInPassword: action.payload.password,
            loggedInId: action.payload.id,
            loggedIn: action.payload.loginStatus === 1 ? true : false
        }
        case REGISTER_USER: return {
            ...state,
            userRegistrationStatus: action.payload
        }
        case VIEW_SELECTED_ARTICLE: return {
            ...state,
            selectedArticleId: action.payload
        }

        case VIEW_EDIT_ARTICLE: return {
            ...state,
            selectedEditArticleId: action.payload.id,
            selectedEditArticleTitle: action.payload.title,
            selectedEditArticleDesc: action.payload.desc,
            selectedEditArticleImage: action.payload.img
        }
        case UPDATE_ARTICLE: return {
            ...state,
            editArticleStatus: action.payload
        }

        case REST_EDIT_ARTICLE_STATUS: return {
            ...state,
            editArticleStatus: action.payload
        }
        case FETCH_SELECTED_ARTICLE_DETAILS: return {
            ...state,
            selectedArticleTitle: action.payload.articleTitle,
            selectedArticleDesc: action.payload.articleDesc,
            selectedArticleUserName: action.payload.userName,
            selectedArticleImage: action.payload.articleImg,

        }
        case FETCH_SELECTED_EDIT_ARTICLE: return {
            ...state,
            selectedArticleTitle: action.payload.articleTitle,
            selectedArticleDesc: action.payload.articleDesc,
            selectedArticleUserName: action.payload.userName,
            selectedArticleImage: action.payload.articleImg,
        }
        case LOGOUT_USER: return {
            ...state,
            // loggedIn: false
            userLoginStatus: 0
        }
        default: return state
    }

}

export default userArticleReducer
