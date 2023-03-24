import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Register from "./Components/Register";


function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
