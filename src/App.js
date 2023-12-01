import React, { useEffect } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import server from './server';

function App() {
  useEffect(() => {
    server.start();
  }, []);

  return (
    <div className="App">
      import { Switch, Route } from 'react-router-dom';
      import AboutPage from './pages/AboutPage';

      <NavigationBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
