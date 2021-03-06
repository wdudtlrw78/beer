import { all, call, put, takeLatest, fork, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_BEERLISTS_REQUEST,
  LOAD_BEERLISTS_SUCCESS,
  LOAD_BEERLISTS_FAILURE,
  ON_COLUMN_DRAGGED_REQUEST,
  ON_COLUMN_DRAGGED_SUCCESS,
  ON_COLUMN_DRAGGED_FAILURE,
  UPDATE_ABV_FILTER_REQUEST,
  UPDATE_ABV_FILTER_SUCCESS,
  UPDATE_ABV_FILTER_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_PRODUCT_ITEM_REQUEST,
  REMOVE_PRODUCT_ITEM_SUCCESS,
  REMOVE_PRODUCT_ITEM_FAILURE,
} from './beerReducer';

function* loadBeerLists() {
  try {
    const { data } = yield call(axios.get, 'https://api.punkapi.com/v2/beers');

    yield put({
      type: LOAD_BEERLISTS_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: LOAD_BEERLISTS_FAILURE,
      error: error.response.data,
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
      error: error.response.data,
    });
  }
}

function* updateAbvFilter(action) {
  try {
    yield delay(1000);
    yield put({
      type: UPDATE_ABV_FILTER_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_ABV_FILTER_FAILURE,
      error: error.response.data,
    });
  }
}

function* addToCart(action) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_TO_CART_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: ADD_TO_CART_FAILURE,
      error: error.response.data,
    });
  }
}

function* removeProductItem(action) {
  try {
    yield delay(1000);
    yield put({
      type: REMOVE_PRODUCT_ITEM_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: REMOVE_PRODUCT_ITEM_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchBeerLists() {
  yield takeLatest(LOAD_BEERLISTS_REQUEST, loadBeerLists);
}

function* watchColumnDragged() {
  yield takeLatest(ON_COLUMN_DRAGGED_REQUEST, onColumnDragged);
}

function* watchAbvFilter() {
  yield takeLatest(UPDATE_ABV_FILTER_REQUEST, updateAbvFilter);
}

function* watchAddtoCart() {
  yield takeLatest(ADD_TO_CART_REQUEST, addToCart);
}

function* watchRemoveProductItem() {
  yield takeLatest(REMOVE_PRODUCT_ITEM_REQUEST, removeProductItem);
}

export default function* beerSaga() {
  yield all([
    fork(watchBeerLists),
    fork(watchColumnDragged),
    fork(watchAbvFilter),
    fork(watchAddtoCart),
    fork(watchRemoveProductItem),
  ]);
}
