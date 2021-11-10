import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import beerReducer from './beerReducer';

//watcher saga -> actions -> worker saga
// import loading from "./loading";

import beerSaga from './beerSaga';

const rootReducer = combineReducers({
  beerReducer,
});

export default rootReducer;

//wathcer saga
export function* rootSaga() {
  yield all([fork(beerSaga)]);
}
