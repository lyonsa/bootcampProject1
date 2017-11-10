import React from 'react';
import { render } from 'react-dom';

import Home from './pages/home';

const root = document.getElementById('root');

// mount app to root node
render(
  <Home />,
  root
);
