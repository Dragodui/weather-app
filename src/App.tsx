import Header from "./components/Header";
import MainPage from "./Pages/WeatherPage";
import HomePage from "./Pages/HomePage";
import "./style.css";
import { FC } from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";

const App:FC = () => {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route
           path="/"
           element = {<HomePage/>}
        />
        <Route
           path="/weather"
           element = {<MainPage/>}
        />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;
