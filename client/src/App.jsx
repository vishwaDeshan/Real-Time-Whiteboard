import './App.css';
import Forms from './Components/Forms/Forms';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Room from './Pages/Room';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" exact element={<Forms />} />
          <Route path="/:roomId" exact element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
