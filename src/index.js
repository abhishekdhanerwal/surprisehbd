// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/stable';

import 'babel-polyfill';
import './public/favicon.ico';
// import './public/manifest.json';
import './assets/common/styles/styles.css';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'typeface-roboto';

import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';


import WebFont from 'webfontloader';

import ScrollToTop from './hoc/ScrollToTop/ScrollToTop';

WebFont.load({
  google: {
    families: ['Modak', 'Cute Font', 'Metal Mania', 'Balsamiq Sans', 'Bangers', 'Pacifico', 'Abel', 'Kaushan Script']
  }
});


render(
      <Router>
        <ScrollToTop />
        <App />
      </Router>,
  document.getElementById("root")
);
