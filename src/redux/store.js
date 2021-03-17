
// import reducer from './reducers/index'
import {
    createStore,
    applyMiddleware
    //combineReducers
} from 'redux';
// import userReducer from './users/userReducer'
// import { articleReducer } from './articles/articleReducer'
import userArticleReducer from './userArticleReducer/reducer'
import thunkMiddleware from 'redux-thunk';

// const rs = combineReducers( {
//     userReducer
//     //articleReducer
// } );

const store = createStore( userArticleReducer, applyMiddleware( thunkMiddleware ) )
//const store = createStore( rootReducer )

export default store
