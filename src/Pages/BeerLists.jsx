import React, { useCallback, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../utils/tableIcons';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_BEERLISTS_REQUEST } from '../Modules/beerReducer';

const BeerLists = () => {
  const dispatch = useDispatch();
  // const [Data, setData] = useState([]);
  const { beerList } = JSON.parse(
    JSON.stringify(useSelector((state) => state.beerReducer))
  );
  useEffect(() => {
    dispatch({
      type: LOAD_BEERLISTS_REQUEST,
    });
  }, []);

  const onColumnDragged = useCallback((sourceIndex, destinationIndex) => {
    console.log(sourceIndex, destinationIndex);
  }, []);

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={[
          { title: 'Name', field: 'name' },
          {
            title: 'Image',
            field: 'image_url',
            render: (item) => <img src={item.image_url} alt="" width="50" />,
          },
          { title: 'abv', field: 'abv' },
        ]}
        data={beerList}
        title="Beer Lists"
        icons={tableIcons}
        options={{ search: false, sorting: false, paginationType: 'stepped' }}
        onColumnDragged={onColumnDragged}
      />
    </div>
  );
};

export default BeerLists;
