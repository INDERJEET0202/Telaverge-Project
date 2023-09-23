import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Home/Home";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
