import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const get = (a: string) => {
    return a;
  };
  return (
    <div className="App">
      <header className="App-header">
        <button type="button">ddddd</button>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          Edit
          <code>src/App.tsx</code>
          and save to reload.
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 3
        </a>
      </header>
    </div>
  );
}

export default App;
