import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import usersReducer from './users/usersReducer';
import loadingReducer from './loadingSpinner/loadersReducer';
import adminUsersReducer from './adminUsers/userReducer';

const combinedReducers = combineReducers({
    users: usersReducer,
    loading: loadingReducer,
    adminUsers: adminUsersReducer
})

const store = createStore(
    combinedReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;