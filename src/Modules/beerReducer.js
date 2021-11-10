import axios from 'axios';
import produce from '../utils/produce';

export const initalState = {
  loadBeerListsLoading: false, // 맥주 리스트들 가져오기
  loadBeerListsDone: false,
  loadBeerListsError: null,

  beerList: [], // 맥주 리스트
};

export const LOAD_BEERLISTS_REQUEST = 'LOAD_BEERLISTS_REQUEST';
export const LOAD_BEERLISTS_SUCCESS = 'LOAD_BEERLISTS_SUCCESS';
export const LOAD_BEERLISTS_FAILURE = 'LOAD_BEERLISTS_FAILURE';

const reducer = (state = initalState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_BEERLISTS_REQUEST:
        draft.loadBeerListsLoading = true;
        draft.loadBeerListsDone = false;
        draft.loadBeerListsError = null;
        break;
      case LOAD_BEERLISTS_SUCCESS:
        draft.loadBeerListsLoading = false;
        draft.beerList = action.data;
        draft.loadBeerListsDone = true;
        break;
      case LOAD_BEERLISTS_FAILURE:
        draft.loadBeerListsLoading = false;
        draft.loadBeerListsError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
