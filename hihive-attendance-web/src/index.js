import reportWebVitals from './reportWebVitals';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import './index.css';
//import Puff from './svg/puff.svg';

if (process.env.NODE_ENV !== 'development') {
  console.log = () => {}
}

/*
const suspenseLoader = (
  <Fade>
    <div className="suspenseLoader">
      <img alt=" " src={Puff} height="125" width="125"/>
      <p>Wait ahh...</p>
    </div>
  </Fade>
);
  <Suspense fallback={suspenseLoader}>
    <App />
  </Suspense>
*/

ReactDOM.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();