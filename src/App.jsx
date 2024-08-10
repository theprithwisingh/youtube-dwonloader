// src/App.js
import React from 'react';
import Downloader from './Downloader';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>YouTube Downloader</h1>
        <Downloader />
      </header>
    </div>
  );
}

export default App;
