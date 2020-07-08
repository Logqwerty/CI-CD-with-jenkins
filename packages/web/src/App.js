import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const URL = process.env.REACT_APP_API_URL;

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
        user {
          name
          age
        }
      }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        return setUser(res.data.user);
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
          Hello! {user.name}
        </a>
      </header>
    </div>
  );
}

export default App;
