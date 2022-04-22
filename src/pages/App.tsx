import React from 'react';
import { Router, BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@pages/Home';
import About from '@pages/About';

import png from '@assets/shop.png';
import '@utils/index';

interface IAppProps {
  test?: string;
}
const App: React.FC<IAppProps> = () => {
  return (
    <BrowserRouter>
      <img src={png} alt="png" />
      <p>react app</p>
      <Routes>
        <Route path={`/`} element={<Home />}></Route>
        <Route path={`/about`} element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
