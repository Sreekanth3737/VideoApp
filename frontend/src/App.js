import './App.css';
import NavBar from './components/Navigation/Navbar';
import Login from './components/userAuth/Login';
import Register from './components/userAuth/Signup'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoUpload from './components/videoUpload/VideoUpload';
import Home from './Pages/Home/Home';
import PlayVideo from './components/videoCards/PlayVideo';
function App() {
  return (
    <>
    <Router>

    <NavBar />
    <Routes>
      <Route path='/register' element={<Register />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/upload-video" element={<VideoUpload />} />
      <Route path="/" element={<Home />} />
      <Route path="/play-video/:id" element={<PlayVideo />} />

    </Routes>
    </Router>
    </>
  );
}

export default App;
