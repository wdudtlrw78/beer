import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_BEERLISTS_FAILURE,
  LOAD_BEERLISTS_REQUEST,
  LOAD_BEERLISTS_SUCCESS,
} from './beerReducer';

// function loadBeerListsAPI() {
//   return axios.get('https://api.punkapi.com/v2/beers').then(reseponse =>);
// }

function* loadBeerLists() {
  try {
    const { data } = yield call(axios.get, 'https://api.punkapi.com/v2/beers');
    console.log('data', Array.isArray(data));
    yield put({
      type: LOAD_BEERLISTS_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: LOAD_BEERLISTS_FAILURE,
      error: error.reseponse.data,
    });
  }
}

function* watchBeerLists() {
  yield takeLatest(LOAD_BEERLISTS_REQUEST, loadBeerLists);
}

export default function* beerSaga() {
  yield all([fork(watchBeerLists)]);
}
