import styled from 'styled-components';

export const Container = styled.section`
  height: calc(100vh - 4rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const THead = styled.thead`
  color: #fff;
  height: 3rem;

  & tr {
    background-color: ${(props) => props.theme.color.green};
  }

  & th {
    padding: 1rem 0;
    font-weight: 500;
  }
`;

export const TBody = styled.tbody`
  & td,
  & th {
    border-bottom: 1px solid ${(props) => props.theme.color.green};
    text-align: center;
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .cart__image {
    height: 5rem;
    margin: 1rem;
  }

  .cart__remove-btn {
    border: none;
    padding: 0.5rem 1rem;
    background-color: ${(props) => props.theme.color.gray};
    color: #fff;
  }

  .cart__remove-btn:hover {
    background-color: ${(props) => props.theme.color.green};
  }
`;
