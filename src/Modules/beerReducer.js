import produce from '../utils/produce';

export const initalState = {
  loadBeerListsLoading: false, // 맥주 리스트들 가져오기
  loadBeerListsDone: false,
  loadBeerListsError: null,

  onColumnDraggedLoading: false, // 칼럼 헤드 드래그
  onColumnDraggedDone: false,
  onColumnDraggedError: null,

  updateAbvFilterLoading: false, // ABV 필터
  updateAbvFilterDone: false,
  updateAbvFilterError: null,

  addToCartLoading: false, // Add Cart
  addToCartDone: false,
  addToCartError: null,

  removeProductItemLoading: false, // Remove Item
  removeProductItemDone: false,
  removeProductItemError: null,

  beerLists: [],
  columns: [
    {
      title: 'Name',
      field: 'name',
      cellStyle: {
        fontSize: '0.875rem',
        color: '#323D45',
      },
    },
    {
      title: 'Tagline',
      field: 'tagline',
      cellStyle: {
        fontSize: '0.875rem',
        color: '#323D45',
      },
    },
    {
      title: 'First_Brewed',
      field: 'first_brewed',
      cellStyle: {
        fontSize: '0.875rem',
        color: '#323D45',
      },
    },
    {
      title: 'ABV',
      field: 'abv',
      cellStyle: {
        fontSize: '0.875rem',
        color: '#323D45',
      },
    },
  ],
  abvChecked: [],
  cart: [],
};

export const LOAD_BEERLISTS_REQUEST = 'LOAD_BEERLISTS_REQUEST';
export const LOAD_BEERLISTS_SUCCESS = 'LOAD_BEERLISTS_SUCCESS';
export const LOAD_BEERLISTS_FAILURE = 'LOAD_BEERLISTS_FAILURE';

export const ON_COLUMN_DRAGGED_REQUEST = 'ON_COLUMN_DRAGGED_REQUEST';
export const ON_COLUMN_DRAGGED_SUCCESS = 'ON_COLUMN_DRAGGED_SUCCESS';
export const ON_COLUMN_DRAGGED_FAILURE = 'ON_COLUMN_DRAGGED_FAILURE';

export const UPDATE_ABV_FILTER_REQUEST = 'UPDATE_ABV_FILTER_REQUEST';
export const UPDATE_ABV_FILTER_SUCCESS = 'UPDATE_ABV_FILTER_SUCCESS';
export const UPDATE_ABV_FILTER_FAILURE = 'UPDATE_ABV_FILTER_FAILURE';

export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const REMOVE_PRODUCT_ITEM_REQUEST = 'REMOVE_PRODUCT_ITEM_REQUEST';
export const REMOVE_PRODUCT_ITEM_SUCCESS = 'REMOVE_PRODUCT_ITEM_SUCCESS';
export const REMOVE_PRODUCT_ITEM_FAILURE = 'REMOVE_PRODUCT_ITEM_FAILURE';

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
        draft.beerLists = action.data;
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

        const destinationIndex = draft.columns[action.data.destinationIndex];
        const sourceIndex = draft.columns[action.data.sourceIndex];
        draft.columns[action.data.destinationIndex] = sourceIndex;
        draft.columns[action.data.sourceIndex] = destinationIndex;
        break;
      case ON_COLUMN_DRAGGED_FAILURE:
        draft.loadBeerListsLoading = false;
        draft.onColumnDraggedError = action.error;
        break;
      case UPDATE_ABV_FILTER_REQUEST:
        draft.updateAbvFilterLoading = true;
        draft.updateAbvFilterDone = false;
        draft.updateAbvFilterError = null;
        break;
      case UPDATE_ABV_FILTER_SUCCESS:
        draft.updateAbvFilterLoading = false;
        draft.updateAbvFilterDone = true;
        // check true
        if (action.data.checked) {
          draft.abvChecked = [...draft.abvChecked, action.data];
          // check false
        } else {
          // 중복제거
          const index = draft.abvChecked.findIndex(
            (item) => item.item.name === action.data.value
          );

          if (index > -1) draft.abvChecked.splice(index, 1);
        }

        draft.beerLists = draft.beerLists.filter(
          (v) =>
            v.abv >= action.data.item.array[0] &&
            v.abv <= action.data.item.array[1]
        );
        break;
      case UPDATE_ABV_FILTER_FAILURE:
        draft.updateAbvFilterLoading = false;
        draft.updateAbvFilterError = action.error;
        break;
      case ADD_TO_CART_REQUEST:
        draft.addToCartLoading = true;
        draft.addToCartDone = false;
        draft.addToCartError = null;
        break;
      case ADD_TO_CART_SUCCESS:
        draft.addToCartLoading = false;
        draft.addToCartDone = true;
        draft.cart = [...draft.cart, action.data];
        break;
      case ADD_TO_CART_FAILURE:
        draft.addToCartLoading = false;
        draft.addToCartError = action.error;
        break;
      case REMOVE_PRODUCT_ITEM_REQUEST:
        draft.removeProductItemLoading = true;
        draft.removeProductItemDone = false;
        draft.removeProductItemError = null;
        break;
      case REMOVE_PRODUCT_ITEM_SUCCESS:
        draft.removeProductItemLoading = false;
        draft.removeProductItemDone = true;

        const index = draft.cart.findIndex(
          (item) => item.list.id === action.data
        );
        if (index > -1) draft.cart.splice(index, 1);

        break;
      case REMOVE_PRODUCT_ITEM_FAILURE:
        draft.removeProductItemLoading = false;
        draft.removeProductItemError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
