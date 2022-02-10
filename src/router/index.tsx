import Home from '@pages/Home';
import About from '@pages/About';
import { IRouteConfig } from '@typings/index';

/* <>
  <img src={png} alt="png" />
  <p>react app</p>
  <Routes>
    <Route path={`/`} element={<Home />}></Route>
    <Route path={`/about`} element={<About />}></Route>
  </Routes>
</>; */

/** 路由配置 */
const routes: IRouteConfig[] = [
  {
    path: '/',
    name: '主页',
    element: Home,
  },
  {
    path: '/about',
    name: '关于',
    element: About,
  },
];
export { routes };
