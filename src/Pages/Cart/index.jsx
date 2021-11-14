import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../BeerLists/styles';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.beerReducer);

  return (
    <Header>
      <Link to="/home">Home</Link>
      <Link to="/cart">Cart({cart.length})</Link>
    </Header>
  );
};

export default Cart;
