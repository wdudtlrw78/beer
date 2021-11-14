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
import Loading from '../../components/Loading';
import { Link, NavLink } from 'react-router-dom';
import abv from '../../utils/data';
import {
  AbvContainer,
  Container,
  Dimmed,
  Header,
  ModalContainer,
} from './styles';

const BeerLists = () => {
  const dispatch = useDispatch();

  const [beerInfo, setBeerInfo] = useState([]);
  // const [filterList, setFilterList] = useState([]);
  const [showBeerInfoModal, setShowBeerInfoModal] = useState(false);
  const [showAbvFilterModal, setShowAbvFilterModal] = useState(false);
  const { loadBeerListsLoading, columns, beerLists, cart, filterList } =
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

  const onToggleCheck = useCallback((checked, dataset) => {
    dispatch({
      type: UPDATE_ABV_FILTER_REQUEST,
      data: { checked, dataset },
    });
  }, []);

  const dataFilter = useCallback((data, filterList) => {
    if (filterList.length === 0) {
      return data;
    }
    const result = data.filter(({ abv }) => {
      let isEligible = false;
      filterList.forEach(({ min, max }) => {
        if (max) {
          if (+min <= abv && +max > abv) {
            isEligible = true;
          }
        } else {
          if (+min <= abv) {
            isEligible = true;
          }
        }
      });
      return isEligible;
    });
    return result;
  }, []);

  const filterData = dataFilter(beerLists, filterList);

  if (loadBeerListsLoading) return <Loading />;

  return (
    <Container>
      <>
        <Header>
          <Link to="/home">Home</Link>
          <NavLink to="/beerlist" activeStyle={{ color: '#66aa74' }}>
            BeerLists
          </NavLink>
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
                    data-min={item.min}
                    data-max={item.max}
                    checked={
                      !!filterList.find((filter) => +filter.min === item.min)
                    }
                    onChange={(e) =>
                      onToggleCheck(e.target.checked, e.target.dataset)
                    }
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </li>
              ))}
          </ModalContainer>
        </AbvContainer>

        <MaterialTable
          columns={columns}
          data={filterData}
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

        {showBeerInfoModal && (
          <>
            <Modal list={beerInfo} showBeerInfoModal={setShowBeerInfoModal} />
            <Dimmed onClick={onRowClick}></Dimmed>
          </>
        )}
      </>
    </Container>
  );
};

export default BeerLists;
