import GameBoyPage from "./pages/GameBoyPage";
import IngamePage from "./pages/IngamePage";
import LoadingPage from "./pages/LoadingPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<GameBoyPage />} />
          <Route path='/loading' element={<LoadingPage />} />
          <Route path='/home' element={<IngamePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;