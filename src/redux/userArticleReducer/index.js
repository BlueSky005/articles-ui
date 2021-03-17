import { combineReducers } from 'redux';
import articles from '../articles/articleReducer';
import users from '../users/userReducer';

export default combineReducers( {
    articles,
    users
} )