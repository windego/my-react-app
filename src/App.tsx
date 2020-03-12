import React from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './test'

function App() {
  console.log(111);
  return (
    <div className='App'>
      <Test />
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React 3
        </a>
      </header>
    </div>
  );
}

export default App;
