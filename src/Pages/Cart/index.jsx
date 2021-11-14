import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { REMOVE_PRODUCT_ITEM_REQUEST } from '../../Modules/beerReducer';
import { Header } from '../BeerLists/styles';
import { Container, Table, TBody, THead } from './styles';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.beerReducer);

  const onClickRemoveItem = useCallback((productId) => {
    dispatch({
      type: REMOVE_PRODUCT_ITEM_REQUEST,
      data: productId,
    });

    alert('The product has been removed.');
  }, []);

  return (
    <>
      <Header>
        <Link to="/home">Home</Link>
        <Link to="/beerlist">BeerLists</Link>
        <NavLink to="/cart" activeStyle={{ color: '#66aa74' }}>
          Cart({cart.length})
        </NavLink>
      </Header>

      {cart.length === 0 ? (
        <Container>
          <p style={{ color: '#939FA5', fontSize: '0.875rem' }}>
            The product list is empty.
          </p>
        </Container>
      ) : (
        <Table>
          <THead>
            <tr>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Product Quantity</th>
              <th>Remove from Cart</th>
            </tr>
          </THead>
          <TBody>
            {cart?.map((product) => (
              <tr key={product.list.id}>
                <td width="25%">{product.list.name}</td>
                <td width="25%">
                  <img
                    className="cart__image"
                    alt={`${product.list.name}`}
                    src={product.list.image_url}
                  />
                </td>
                <td width="25%">{product.totalQuantity} EA</td>
                <td width="25%">
                  <button
                    type="button"
                    onClick={() => onClickRemoveItem(product.list.id)}
                    className="cart__remove-btn"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </TBody>
        </Table>
      )}
    </>
  );
};

export default Cart;
