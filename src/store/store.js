import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from "redux-thunk";
import authDuck from "./ducks/authDuck";
import homeDuck from "./ducks/homeDuck";
import notificationDuck from "./ducks/notificationsDuck";
import preferencesDuck from "./ducks/preferencesDuck";

const rootReducer = combineReducers({
    authDuck: authDuck,
    homeDuck: homeDuck,
    notifyDuck: notificationDuck,
    preferencesDuck: preferencesDuck
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));