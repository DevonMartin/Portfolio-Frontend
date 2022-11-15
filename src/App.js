import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Welcome from "./components/Home/Welcome";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Footer from "./components/Footer";

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="*" element={<Outlet />} />
      </Routes>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/journey" element={<Journey />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/resume" element={<Resume />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
