import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, NavLink, HashRouter, Switch} from 'react-router-dom';
import App from './App';
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  
    <React.StrictMode>
      <div className="ui container">
        <div className="ui segment">
          <App/>
        </div>       
      </div>
    </React.StrictMode>,
    document.getElementById('root')
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();