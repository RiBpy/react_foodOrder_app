
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { initialState, reducer } from "./context/reducer";
import { StateProvider } from './context/stateProvider';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
     <StateProvider initialState={initialState} reducer={reducer}>
        <App />
    </StateProvider>
  </Router>
)