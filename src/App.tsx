import Header from "./components/Header";
import MainPage from "./components/Pages/WeatherPage";
import HomePage from "./components/Pages/HomePage";
import "./style.css";
import { FC } from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";

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
    </Router>
  )
}

export default App;
