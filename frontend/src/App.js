import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import Footer from "./components/Navbar/Footer/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/flights/search' element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
