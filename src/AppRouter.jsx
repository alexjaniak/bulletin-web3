import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from 'react-router-dom';
  import Bulletin from './pages/Bulletin';
  
  function AppRouter() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Bulletin />} />
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;
  