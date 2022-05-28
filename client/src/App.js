import "./App.css";
import logo from "./logo.png"

import { Main } from "./main"

function App() {
  return (
    <div className="App">
      <img className={false && "App-logo"} src={logo} alt="logo" />
      <h1>Multimedia Converter</h1>
      <h3>Easily convert files from one format to another online, for free.</h3>
      <Main />
    </div>
  );
}

export default App;
