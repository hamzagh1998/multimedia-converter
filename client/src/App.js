import "./App.css";
import logo from "./logo.png";
import axios from "axios";

import { Main } from "./main";

function App() {

  axios.defaults.baseURL = "http://localhost:5000/api";

  return (
    <div className="App">
      <img src={logo} alt="logo" />
      <h1>Multimedia Converter</h1>
      <h3>Easily convert files from one format to another online, for free.</h3>
      <Main />
    </div>
  );
}

export default App;
