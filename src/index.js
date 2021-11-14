import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import rootReducer from './Modules';
import { rootSaga } from './Modules';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import GlobalStyle from './styles/global-styles';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  compose(
    composeWithDevTools(applyMiddleware(sagaMiddleware))
    // ,
    // (window as any).__REDUX_DEVTOOLS_EXTENSION__
    //   ? composeWithDevTools()
    //   : (f) => f
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalStyle />
      <Routes />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
