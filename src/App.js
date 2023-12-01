import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
