import React from "react";
import MoviesPage from "./MoviesPage";
import "./style.scss";
import MovieForm from "./MovieForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";

const App = () => {
  
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<MoviesPage  />} />
          <Route path="/addMovie" element={<MovieForm />} />
          <Route path="/editMovie/:id" element={<MovieForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  )
};

export default App;
