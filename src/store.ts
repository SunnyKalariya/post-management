import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userLoginReducers } from './reducers/userReducers';

const reducer = combineReducers({
    userLogin: userLoginReducers,
})

const userInfo = localStorage.getItem('login');
const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;