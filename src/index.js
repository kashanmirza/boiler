import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './store/Reducers/rootReducer'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import history from './History';
import { Provider } from 'react-redux';


const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


const app = (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));