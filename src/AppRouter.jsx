import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from 'react-router-dom';
  import Bulletin from './pages/Bulletin';

  window.scrollTo(0, Math.floor(Math.random() * 10000))
  
  function AppRouter({db}) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Bulletin db={db}/>} />
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;
  