import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import MaterialTable from 'material-table';
import tableIcons from '../../utils/tableIcons';
import { useSelector, useDispatch } from 'react-redux';
import {
  LOAD_BEERLISTS_REQUEST,
  ON_COLUMN_DRAGGED_REQUEST,
  UPDATE_ABV_FILTER_REQUEST,
} from '../../Modules/beerReducer';
import { Link } from 'react-router-dom';
import abv from '../../utils/data';
import {
  AbvContainer,
  Container,
  Dimmed,
  Header,
  ModalContainer,
  ModalDetailContainer,
  TableContainer,
} from './styles';

const BeerLists = () => {
  const dispatch = useDispatch();

  const [beerInfo, setBeerInfo] = useState([]);
  // const [beerLists, setBeerLists] = useState([]);
  const [showBeerInfoModal, setShowBeerInfoModal] = useState(false);
  const [showAbvFilterModal, setShowAbvFilterModal] = useState(false);
  const { loadBeerListsLoading, columns, abvChecked, beerLists, cart } =
    JSON.parse(JSON.stringify(useSelector((state) => state.beerReducer)));

  useEffect(() => {
    dispatch({
      type: LOAD_BEERLISTS_REQUEST,
    });
  }, []);

  const onColumnDragged = useCallback((sourceIndex, destinationIndex) => {
    dispatch({
      type: ON_COLUMN_DRAGGED_REQUEST,
      data: {
        sourceIndex,
        destinationIndex,
      },
    });
  }, []);

  const onRowClick = useCallback((e, rowData) => {
    setShowBeerInfoModal((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
    setBeerInfo(rowData);
  }, []);

  const toggleAbvFilterModal = useCallback(() => {
    setShowAbvFilterModal((prev) => !prev);
  }, []);

  const onToggleCheck = useCallback((item, e) => {
    let { currentTarget: input } = e;

    const value = input.value;
    const checked = input.checked;

    dispatch({
      type: UPDATE_ABV_FILTER_REQUEST,
      data: { item, value, checked },
    });
  }, []);

  if (loadBeerListsLoading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignlists: 'center',
          height: '100vh',
        }}
      >
        로드 중...
      </div>
    );

  return (
    <Container>
      <>
        <Header>
          <Link to="/home">Home</Link>
          <Link to="/cart">Cart({cart.length})</Link>
        </Header>

        <AbvContainer>
          <button
            style={{ position: 'relative' }}
            onClick={toggleAbvFilterModal}
          >
            ABV Filter
          </button>

          <ModalContainer showAbvFilterModal={showAbvFilterModal}>
            {showAbvFilterModal &&
              abv.map((item) => (
                <li key={item._id}>
                  <input
                    type="checkbox"
                    name={item.name}
                    value={item.name}
                    checked={
                      abvChecked.findIndex(
                        (value) => value.item.name === item.name
                      ) >= 0
                    }
                    onChange={(e) => onToggleCheck(item, e)}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </li>
              ))}
          </ModalContainer>
        </AbvContainer>

        <TableContainer style={{ maxWidth: '100%' }}>
          <MaterialTable
            columns={columns}
            data={beerLists}
            title="Beer Lists"
            icons={tableIcons}
            options={{
              search: false,
              sorting: false,
              paginationType: 'stepped',
              headerStyle: {
                backgroundColor: '#66aa74',
                color: '#fff',
                fontSize: '1rem',
              },
            }}
            onColumnDragged={onColumnDragged}
            onRowClick={onRowClick}
          />
        </TableContainer>
        {showBeerInfoModal && (
          <>
            <Modal list={beerInfo} />
            <Dimmed onClick={onRowClick}></Dimmed>
          </>
        )}
      </>
    </Container>
  );
};

export default BeerLists;
