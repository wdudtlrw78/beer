import produce from '../utils/produce';

export const initalState = {
  loadBeerListsLoading: false, // 맥주 리스트들 가져오기
  loadBeerListsDone: false,
  loadBeerListsError: null,

  onColumnDraggedLoading: false, // 칼럼 드래그
  onColumnDraggedDone: false,
  onColumnDraggedError: null,

  beerList: [], // 맥주 리스트

  column: [
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Tagline',
      field: 'tagline',
    },
    {
      title: 'First_Brewed',
      field: 'first_brewed',
    },
    { title: 'ABV', field: 'abv' },
  ],
};

export const LOAD_BEERLISTS_REQUEST = 'LOAD_BEERLISTS_REQUEST';
export const LOAD_BEERLISTS_SUCCESS = 'LOAD_BEERLISTS_SUCCESS';
export const LOAD_BEERLISTS_FAILURE = 'LOAD_BEERLISTS_FAILURE';

export const ON_COLUMN_DRAGGED_REQUEST = 'ON_COLUMN_DRAGGED_REQUEST';
export const ON_COLUMN_DRAGGED_SUCCESS = 'ON_COLUMN_DRAGGED_SUCCESS';
export const ON_COLUMN_DRAGGED_FAILURE = 'ON_COLUMN_DRAGGED_FAILURE';

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
      case ON_COLUMN_DRAGGED_REQUEST:
        draft.onColumnDraggedLoading = true;
        draft.onColumnDraggedDone = false;
        draft.onColumnDraggedError = null;
        break;
      case ON_COLUMN_DRAGGED_SUCCESS:
        draft.onColumnDraggedLoading = false;
        draft.onColumnDraggedDone = true;

        const tmp = draft.column[action.data.destinationIndex];

        draft.column[action.data.destinationIndex] =
          draft.column[action.data.sourceIndex];

        draft.column[action.data.sourceIndex] = tmp;

        break;
      case ON_COLUMN_DRAGGED_FAILURE:
        draft.loadBeerListsLoading = false;
        draft.onColumnDraggedError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
