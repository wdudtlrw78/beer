import { Add, Remove } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART_REQUEST } from '../../Modules/beerReducer';
import {
  Abv,
  AddButton,
  BeerCategory,
  BottomGroup,
  CartAddButton,
  CartAddButtonContainer,
  CartButtonContainer,
  Container,
  FirstBrewed,
  RemoveButton,
  ToalQuantity,
  TopGroup,
} from './styles';

const Modal = ({ list }) => {
  const dispatch = useDispatch();

  const [totalQuantity, setTotalQuantity] = useState(0);

  const onClickRemoveButton = useCallback(() => {
    setTotalQuantity((prev) => --prev);
  }, []);

  const onClickAddButton = useCallback(() => {
    setTotalQuantity((prev) => ++prev);
  }, []);

  const minusTotalQuantity = useCallback((totalQuantity) => {
    if (totalQuantity < 0) {
      alert("I can't reduce it any more.");
      setTotalQuantity(0);
    }
  }, []);

  const onClickAddToCart = useCallback(() => {
    dispatch({
      type: ADD_TO_CART_REQUEST,
      data: {
        list: { ...list, totalQuantity },
      },
    });
  }, [list, totalQuantity]);
  return (
    <Container>
      <TopGroup>
        <BeerCategory>
          <Abv>
            <span>ABV</span>&nbsp;<strong>{list.abv}</strong>
          </Abv>
          <FirstBrewed>
            <span>First_Brewed</span>&nbsp;<strong>{list.first_brewed}</strong>
          </FirstBrewed>
        </BeerCategory>
        <img src={list.image_url} alt={list.image_url} />
      </TopGroup>
      <BottomGroup>
        <h3>{list.name}</h3>
        <p>{list.tagline}</p>
        <p>{list.description}</p>
      </BottomGroup>
      <CartButtonContainer>
        <RemoveButton onClick={onClickRemoveButton}>
          <Remove />
        </RemoveButton>
        <ToalQuantity>
          <span>
            {totalQuantity < 0
              ? minusTotalQuantity(totalQuantity)
              : totalQuantity}
          </span>
        </ToalQuantity>
        <AddButton onClick={onClickAddButton}>
          <Add />
        </AddButton>
      </CartButtonContainer>

      <CartAddButtonContainer>
        <CartAddButton onClick={onClickAddToCart}>Add to Cart</CartAddButton>
      </CartAddButtonContainer>
    </Container>
  );
};

export default Modal;
