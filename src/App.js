import GameBoyPage from "./pages/GameBoyPage";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import RoomPage from "./pages/RoomPage";
import NotificationPage from "./pages/NotificationPage";
import BoardPage from "./pages/BoardPage";
import PostDetailPage from "./pages/PostDetailPage";
import { Write, Edit } from "./pages/PostEditorPage";
import CommunityPage from "./pages/CommunityPage";
import RankPage from "./pages/RankPage";
import { Status404 } from "./pages/ErrorResponsePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<GameBoyPage />} />
          <Route path='/loading' element={<LoadingPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/lobby' element={<LobbyPage />} />
          <Route path='/notification' element={<NotificationPage />} />
          <Route path='/board' element={<BoardPage />} />
          <Route path='/board/:id' element={<PostDetailPage />} />
          <Route path='/board/write' element={<Write />} />
          <Route path='/board/edit' element={<Edit />} />
          <Route path='/community' element={<CommunityPage />} />
          <Route path='/rank' element={<RankPage />} />
          <Route path='/room/:id' element={<RoomPage />} />
          <Route path='/exception/404' element={<Status404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;