import styled from 'styled-components';

export const Container = styled.div`
  width: 22.5rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 0.25rem;
  padding: 1rem;
  z-index: 100;
`;

export const TopGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & img {
    margin-top: 1rem;
    height: 16rem;
  }
`;

export const BeerCategory = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Abv = styled.div`
  background: #f2f2f2;
  padding: 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;

  & span {
    font-size: 0.5rem;
  }
`;

export const FirstBrewed = styled.div`
  background: #f2f2f2;
  padding: 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;

  & span {
    font-size: 0.5rem;
  }
`;

export const BottomGroup = styled.div`
  margin: 2rem 0 1rem 0;

  & p {
    color: ${(props) => props.theme.color.gray};
  }

  & p:nth-child(2) {
    margin-top: 0.25rem;
    font-size: 0.75rem;
  }

  & p:nth-child(3) {
    margin-top: 1rem;
    font-size: 0.875rem;
    font-weight: bold;
    color: ${(props) => props.theme.color.primary};
  }
`;

export const CartButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  background: ${(props) => props.theme.color.green};
  border-radius: 0.25rem;
`;

export const RemoveButton = styled.button`
  padding: 0.5rem;
  margin-left: 0.5rem;
  color: #fff;
`;

export const ToalQuantity = styled.div`
  background: #fff;
  padding: 0.25rem 0.5rem;
  color: ${(props) => props.theme.color.primary};
`;

export const AddButton = styled.button`
  padding: 0.5rem;
  margin-right: 0.5rem;
  color: #fff;
`;

export const CartAddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  background: ${(props) => props.theme.color.green};
  border-radius: 0.25rem;
`;

export const CartAddButton = styled.button`
  width: 100%;
  height: 2.625rem;
  color: #fff;
  font-weight: bold;
`;
