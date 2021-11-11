import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../components/Modal';
import MaterialTable, { MTableBodyRow } from 'material-table';
import tableIcons from '../utils/tableIcons';
import { useSelector, useDispatch } from 'react-redux';
import {
  LOAD_BEERLISTS_REQUEST,
  ON_COLUMN_DRAGGED_REQUEST,
} from '../Modules/beerReducer';
import { Link } from 'react-router-dom';

const BeerLists = () => {
  const dispatch = useDispatch();

  const [beerInfo, setBeerInfo] = useState([]);
  const [showBeerInfoModal, setShowBeerInfoModal] = useState(false);
  const { beerList, loadBeerListsLoading, column } = JSON.parse(
    JSON.stringify(useSelector((state) => state.beerReducer))
  );

  useEffect(() => {
    dispatch({
      type: LOAD_BEERLISTS_REQUEST,
    });
  }, []);

  const onColumnDragged = (sourceIndex, destinationIndex) => {
    dispatch({
      type: ON_COLUMN_DRAGGED_REQUEST,
      data: {
        sourceIndex,
        destinationIndex,
      },
    });
  };

  const onRowClick = useCallback((e, rowData) => {
    setShowBeerInfoModal(true);
    setBeerInfo(rowData);
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
    <>
      <Link to="/home">home</Link>
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={column}
          data={beerList}
          title="Beer Lists"
          icons={tableIcons}
          options={{ search: false, sorting: false, paginationType: 'stepped' }}
          onColumnDragged={onColumnDragged}
          onRowClick={onRowClick}
        />
      </div>
      {showBeerInfoModal && <Modal list={beerInfo} />}
    </>
  );
};

export default BeerLists;
