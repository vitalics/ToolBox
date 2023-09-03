import { HashRouter, Route, Routes } from 'react-router-dom';

import NotFound from '@/renderer/pages/NotFound';
import Main from '@/renderer/pages/Main';

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Main />} />
        <Route path="*" element={NotFound()} />
      </Route>
    </Routes>
  </HashRouter>
);

export default App;
