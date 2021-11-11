import { all, call, put, takeLatest, fork, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_BEERLISTS_REQUEST,
  LOAD_BEERLISTS_SUCCESS,
  LOAD_BEERLISTS_FAILURE,
  ON_COLUMN_DRAGGED_REQUEST,
  ON_COLUMN_DRAGGED_SUCCESS,
  ON_COLUMN_DRAGGED_FAILURE,
} from './beerReducer';

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

function* onColumnDragged(action) {
  try {
    yield delay(1000);
    yield put({
      type: ON_COLUMN_DRAGGED_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: ON_COLUMN_DRAGGED_FAILURE,
      error: error.reseponse.data,
    });
  }
}

function* watchBeerLists() {
  yield takeLatest(LOAD_BEERLISTS_REQUEST, loadBeerLists);
}

function* watchColumnDragged() {
  yield takeLatest(ON_COLUMN_DRAGGED_REQUEST, onColumnDragged);
}

export default function* beerSaga() {
  yield all([fork(watchBeerLists), fork(watchColumnDragged)]);
}
