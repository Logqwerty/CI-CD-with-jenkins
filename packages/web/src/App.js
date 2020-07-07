import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const URL = "http://localhost:4000/graphql";

function App() {
  const [hello, setHello] = useState("");

  useEffect(() => {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ hello }" }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        return setHello(res.data.hello);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {hello}
        </a>
      </header>
    </div>
  );
}

export default App;
