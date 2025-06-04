import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";
import { useSocket } from "./hooks/useSocket";
function App() {
  const socket = useSocket();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />}></Route>
        <Route path="/room/:roomId" element={<Room socket={socket} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
