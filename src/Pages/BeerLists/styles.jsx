import styled, { css } from 'styled-components';

export const Container = styled.section``;

export const Header = styled.header`
  weigth: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    color: ${(props) => props.theme.color.primary};
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  & a:hover {
    color: ${(props) => props.theme.color.green};
  }
`;

export const AbvContainer = styled.div`
  position: absolute;
  top: 5.125rem;
  left: 8.75rem;
  z-index: 20;

  & button {
    color: ${(props) => props.theme.color.primary};
    border: 1px solid ${(props) => props.theme.color.primary};
    border-radius: 0.25rem;
    padding: 0.5rem;
    font-size: 0.75rem;
  }

  & button:hover {
    background: ${(props) => props.theme.color.green};
    color: #fff;
    border: 1px solid ${(props) => props.theme.color.green};
  }
`;

export const ModalContainer = styled.ul`
  width: 8.75rem;
  padding-left: 0.5rem;
  background: #fff;
  margin-top: 0.875rem;

  ${(props) =>
    props.showAbvFilterModal &&
    css`
      border: 1px solid ${(props) => props.theme.color.primary};
      border-radius: 0.25rem;
    `}

  & li {
    display: flex;
    align-items: center;
    padding: 0.25rem;

    & label {
      font-size: 0.875rem;
      color: ${(props) => props.theme.color.primary};
      margin-left: 0.5rem;
    }
  }
`;

export const TableContainer = styled.div``;

export const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  cursor: pointer;
  z-index: 30;
`;
